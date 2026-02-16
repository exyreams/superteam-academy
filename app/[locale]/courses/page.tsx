import { mockCourses, mockLearningPaths, mockUserStats, mockLastAccessed } from '@/lib/data/courses';
import { CourseFilters } from '@/components/courses/CourseFilters';
import { CuratedPaths } from '@/components/courses/CuratedPaths';
import { CourseGrid } from '@/components/courses/CourseGrid';
import { SessionStats } from '@/components/courses/SessionStats';
import { LastAccessed } from '@/components/courses/LastAccessed';
import { NavRail } from '@/components/layout/NavRail';
import { TopBar } from '@/components/layout/TopBar';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* App Shell Grid */}
      <div className="grid grid-cols-[60px_1fr] grid-rows-[48px_1fr] h-screen max-w-full">
        {/* Top Bar - spans all columns */}
        <div className="col-span-2">
          <TopBar />
        </div>

        {/* Nav Rail */}
        <NavRail />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] overflow-hidden">
          {/* Left: Course Catalog */}
          <main className="px-8 py-8 overflow-y-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="mb-6 border-b border-ink-primary pb-4 relative">
                <span className="bg-ink-primary text-bg-base px-3 py-1 text-[10px] uppercase tracking-widest inline-block mb-3">
                  DATABASE ACCESS
                </span>
                <h1 className="font-display font-bold leading-[0.9] -tracking-[0.02em] text-[48px]">
                  COURSE CATALOG
                </h1>
                <div className="absolute bottom-[-3px] right-0 w-full h-px border-b border-dashed border-ink-secondary" />
              </div>

              {/* Search and Filters */}
              <CourseFilters />
            </div>

            {/* Curated Paths */}
            <CuratedPaths paths={mockLearningPaths} />

            {/* Course Grid */}
            <CourseGrid courses={mockCourses} />

            {/* Bottom spacing */}
            <div className="h-12" />
          </main>

          {/* Right: Context Panel */}
          <aside className="bg-bg-base px-6 py-8 flex flex-col gap-12 border-l border-ink-secondary overflow-y-auto">
            <SessionStats stats={mockUserStats} />
            <LastAccessed course={mockLastAccessed} />
          </aside>
        </div>
      </div>
    </div>
  );
}
