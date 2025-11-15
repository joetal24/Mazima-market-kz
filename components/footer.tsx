import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-bold text-foreground">MazimaMarket</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting Ugandan farmers directly with buyers through real-time prices and verified trade.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">For Farmers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">For Buyers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Market Prices</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Farming Tips</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Market Guide</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition">Help Center</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition cursor-pointer">
                <Mail className="h-4 w-4" /> contact@mazimamarket.ug
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition cursor-pointer">
                <Phone className="h-4 w-4" /> +256 XXX XXX XXX
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition cursor-pointer">
                <MapPin className="h-4 w-4" /> Kampala, Uganda
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 MazimaMarket. Empowering Ugandan farmers and buyers.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Privacy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Terms</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
