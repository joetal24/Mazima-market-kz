export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation skeleton */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <div className="h-8 w-32 bg-muted rounded animate-pulse" />
          <div className="flex-1" />
          <div className="h-8 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Search Header skeleton */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="h-10 w-72 bg-muted rounded animate-pulse mb-4" />
            <div className="h-6 w-96 bg-muted rounded animate-pulse mb-8" />

            {/* Search Bar skeleton */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 h-11 bg-muted rounded animate-pulse" />
            </div>

            {/* Filters skeleton */}
            <div className="flex gap-4 flex-wrap">
              <div className="h-10 w-32 bg-muted rounded animate-pulse" />
              <div className="h-10 w-40 bg-muted rounded animate-pulse" />
              <div className="h-10 w-40 bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Results skeleton */}
          <div className="space-y-6">
            <div className="h-5 w-64 bg-muted rounded animate-pulse" />

            {/* Farmer cards skeleton */}
            <div className="grid gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-border rounded-lg overflow-hidden">
                  <div className="p-6">
                    {/* Farmer header skeleton */}
                    <div className="flex items-start justify-between mb-4 pb-4 border-b border-border">
                      <div className="flex-1">
                        <div className="h-6 w-48 bg-muted rounded animate-pulse mb-3" />
                        <div className="h-4 w-32 bg-muted rounded animate-pulse mb-3" />
                        <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                      </div>
                      <div className="h-10 w-32 bg-muted rounded animate-pulse" />
                    </div>

                    {/* Products grid skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="border border-border rounded-lg p-4">
                          <div className="w-full h-32 bg-muted rounded animate-pulse mb-3" />
                          <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                          <div className="space-y-2">
                            <div className="h-3 bg-muted rounded animate-pulse" />
                            <div className="h-3 bg-muted rounded animate-pulse" />
                            <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
                          </div>
                          <div className="h-8 bg-muted rounded animate-pulse mt-3" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
