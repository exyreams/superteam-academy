import { mockCourses, mockLearningPaths, mockUserStats, mockLastAccessed, Course } from '@/lib/data/courses';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { CuratedPaths } from '@/components/courses/CuratedPaths';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { SessionStats } from '@/components/courses/SessionStats';
import { LastAccessed } from '@/components/courses/LastAccessed';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';
import { DotGrid } from '@/components/shared/DotGrid';
import { client, ALL_COURSES_QUERY } from '@/sanity/client';

export default async function CoursesPage() {
  
  let sanityData: Course[] = [];
  try {
    sanityData = await client.fetch(ALL_COURSES_QUERY, {}, { cache: 'no-store' });
  } catch {
    console.warn("Sanity fetch failed, falling back to mock courses only");
  }

  // Merge Sanity data with mock data so the UI doesn't look empty before they add lots of courses
  const mergedCourses = [...sanityData, ...mockCourses];

  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[60px_1fr] lg:grid-rows-[48px_1fr] min-h-screen lg:h-screen lg:overflow-hidden max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-1 lg:col-span-2">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] overflow-visible lg:overflow-hidden relative">
          <DotGrid />
          {/* Left: Course Catalog */}
          <main className="px-4 py-6 lg:px-8 lg:py-8 overflow-visible lg:overflow-y-auto relative z-10">
            {/* Header */}
            <div className="mb-8 lg:mb-12">
              <div className="mb-6 border-b border-ink-secondary/20 dark:border-border pb-4 relative">
                <span className="bg-ink-primary text-bg-base px-3 py-1 text-[10px] uppercase tracking-widest inline-block mb-3">
                  DATABASE ACCESS
                </span>
                <h1 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[36px] lg:text-[48px]">
                  COURSE CATALOG
                </h1>
                <div className="absolute bottom-[-3px] right-0 w-full h-px border-b border-dashed border-ink-secondary/20 dark:border-border" />
              </div>

              {/* Search and Filters */}
              <CourseFilters />
            </div>

            {/* Curated Paths */}
            <CuratedPaths paths={mockLearningPaths} />

            {/* Course Grid */}
            <CourseGrid courses={mergedCourses} />

            {/* Bottom spacing */}
            <div className="h-12" />
          </main>

          {/* Right: Context Panel */}
          <aside className="bg-bg-base px-6 py-8 flex flex-col gap-12 border-t lg:border-t-0 border-l-0 lg:border-l border-ink-secondary/20 dark:border-border overflow-visible lg:overflow-y-auto relative z-10">
            <SessionStats stats={mockUserStats} />
            <LastAccessed course={mockLastAccessed} />
          </aside>
        </div>
      </div>
    </div>
  );
}
