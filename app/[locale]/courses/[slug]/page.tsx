import { mockCourseDetail, CourseDetail } from '@/lib/data/course-detail';
import { CourseHeader } from '@/components/course-detail/CourseHeader';
import { ModuleList } from '@/components/course-detail/ModuleList';
import { ReviewsList } from '@/components/course-detail/ReviewsList';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { client, COURSE_BY_SLUG_QUERY } from '@/sanity/client';
import { notFound } from 'next/navigation';

interface SanityLessonRaw {
  _id: string;
  title?: string;
  type?: 'challenge' | 'reading';
}

interface SanityModuleRaw {
  _id: string;
  order?: number;
  title?: string;
  lessons?: SanityLessonRaw[];
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> | { slug: string; locale: string } }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // 1. Fetch from Sanity CMS
  let sanityCourse = null;
  try {
    sanityCourse = await client.fetch(COURSE_BY_SLUG_QUERY, { slug }, { cache: 'no-store' });
  } catch (error) {
    console.warn("Error fetching course detail from Sanity", error);
  }

  // 2. Map Sanity Document to CourseDetail interface or Fallback to Mokck
  let course: CourseDetail;
  
  if (sanityCourse) {
      // Map the Sanity unstructured data back into our exact UI shape
      course = {
         id: sanityCourse._id,
         slug: sanityCourse.slug,
         title: sanityCourse.title || "UNTITLED COURSE",
         ref: `TRK-${sanityCourse.track_id || 0}`,
         category: sanityCourse.category || "DEV",
         description: sanityCourse.description || "",
         instructor: { name: "Community", username: "@superteam" },
         duration: "N/A", // Calculated from lessons duration
         difficulty: sanityCourse.difficulty === 3 ? "advanced" : sanityCourse.difficulty === 2 ? "intermediate" : "beginner",
         xpBounty: (sanityCourse.xp_per_lesson || 100) * (sanityCourse.modules?.reduce((acc: number, m: SanityModuleRaw) => acc + (m.lessons?.length || 0), 0) || 0),
         totalLessons: sanityCourse.modules?.reduce((acc: number, m: SanityModuleRaw) => acc + (m.lessons?.length || 0), 0) || 0,
         completedLessons: 0,
         progress: 0,
         enrolled: false,
         reviews: mockCourseDetail.reviews, // Still mock reviews for now
         modules: sanityCourse.modules?.map((m: SanityModuleRaw, i: number) => ({
             id: m._id,
             number: m.order || i+1,
             title: m.title || "Untitled Module",
             description: "",
             duration: "N/A",
             completed: 0,
             total: m.lessons?.length || 0,
             lessons: m.lessons?.map((l: SanityLessonRaw) => ({
                 id: l._id,
                 title: l.title || "Untitled Lesson",
                 duration: "N/A",
                 type: l.type === 'challenge' ? 'challenge' : 'content',
                 completed: false,
                 locked: true,
             })) || []
         })) || []
      }
  } else if (slug === 'mock-solana-fundamentals' || slug === 'account-model') {
      course = mockCourseDetail; // Allow legitimate mock courses
  } else {
      notFound(); // 404 if hitting a typo or unpublished URL
  }


  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr_350px] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-1 lg:col-span-3">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Content Area */}
        <main className="px-4 py-6 lg:px-8 lg:py-8 overflow-visible lg:overflow-y-auto">
          <CourseHeader
            courseSlug={course.slug}
            title={course.title}
            courseRef={course.ref}
            category={course.category}
            description={course.description}
            instructor={course.instructor}
            duration={course.duration}
            difficulty={course.difficulty}
            xpBounty={course.xpBounty}
            enrolled={course.enrolled}
          />

          <ModuleList
            modules={course.modules}
            progress={course.progress}
            courseSlug={course.slug}
          />

          {/* Bottom spacing */}
          <div className="h-12" />
        </main>

        {/* Right: Reviews Sidebar */}
        <aside className="bg-bg-base px-6 py-8 border-t lg:border-t-0 border-l-0 lg:border-l border-ink-secondary/20 dark:border-border overflow-visible lg:overflow-y-auto">
          <ReviewsList reviews={course.reviews} />
        </aside>
      </div>
    </div>
  );
}
