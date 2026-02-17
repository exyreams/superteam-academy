import { mockCourseDetail } from '@/lib/data/course-detail';
import { CourseHeader } from '@/components/course-detail/CourseHeader';
import { ModuleList } from '@/components/course-detail/ModuleList';
import { ReviewsList } from '@/components/course-detail/ReviewsList';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';

export default function CourseDetailPage() {
  const course = mockCourseDetail;

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
