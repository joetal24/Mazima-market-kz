import { Card } from '@/components/ui/card'

export function ProductCategories() {
  const categories = [
    {
      title: "Fresh Produce",
      color: "bg-green-100",
      textColor: "text-green-700",
      products: [
        { name: "Maize", image: "/maize-corn.jpg" },
        { name: "Beans", image: "/dried-beans.jpg" },
        { name: "Tomatoes", image: "/fresh-tomatoes.png" },
        { name: "Onions", image: "/yellow-onions.jpg" },
        { name: "Potatoes", image: "/irish-potatoes.jpg" },
        { name: "Cabbages", image: "/green-cabbage.jpg" }
      ]
    },
    {
      title: "Cash Crops",
      color: "bg-orange-100",
      textColor: "text-orange-700",
      products: [
        { name: "Coffee", image: "/pile-of-coffee-beans.png" },
        { name: "Tea", image: "/loose-tea-leaves.png" },
        { name: "Cotton", image: "/cotton-plant.jpg" },
        { name: "Sugarcane", image: "/sugarcane.jpg" }
      ]
    },
    {
      title: "Horticulture",
      color: "bg-amber-100",
      textColor: "text-amber-700",
      products: [
        { name: "Avocados", image: "/ripe-avocado-halves.png" },
        { name: "Mangoes", image: "/mango-fruit.jpg" },
        { name: "Pineapples", image: "/single-ripe-pineapple.png" },
        { name: "Hot Peppers", image: "/red-hot-peppers.jpg" }
      ]
    }
  ]

  return (
    <section id="products" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 text-balance">
          Products You Can Sell
        </h2>
        <p className="text-center text-muted-foreground mb-16">
          Fresh produce • Cash crops • Horticulture
        </p>

        <div className="space-y-16">
          {categories.map((category, idx) => (
            <div key={idx}>
              <div className={`${category.color} ${category.textColor} rounded-lg p-4 mb-8 inline-block font-semibold`}>
                {category.title}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.products.map((product, pidx) => (
                  <Card key={pidx} className="overflow-hidden hover:shadow-lg transition group cursor-pointer">
                    <div className="relative bg-secondary/30 aspect-square overflow-hidden">
                      <img 
                        src={product.image || "/placeholder.svg"} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 text-center">
                      <p className="font-medium text-sm text-foreground line-clamp-2">{product.name}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
