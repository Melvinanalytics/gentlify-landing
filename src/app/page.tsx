import { NewsletterSignup } from '@/components/NewsletterSignup'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold text-primary">Gentlify</h1>
          <button 
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition cursor-not-allowed opacity-75"
            disabled
          >
            App startet bald →
          </button>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Empathische Erziehung
            <span className="text-primary"> mit KI-Unterstützung</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gentlify hilft dir in herausfordernden Momenten mit deinem Kind. 
            Erhalte sofort einfühlsame, bedürfnisorientierte Lösungsvorschläge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-secondary transition cursor-not-allowed opacity-75"
              disabled
            >
              App startet bald
            </button>
            <a 
              href="#features"
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-medium border-2 border-primary hover:bg-muted transition"
            >
              Mehr erfahren
            </a>
          </div>

          {/* Newsletter Signup */}
          <div className="mb-8">
            <p className="text-lg font-medium text-gray-700 mb-4">
              📬 Werde benachrichtigt, wenn Gentlify startet
            </p>
            <NewsletterSignup 
              variant="hero" 
              source="landing_hero"
              className="mx-auto"
            />
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Wissenschaftlich fundiert</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Datenschutz garantiert</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>In 30 Sekunden startklar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">So funktioniert Gentlify</h3>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Situation beschreiben</h4>
            <p className="text-gray-600">
              Teile deine aktuelle Herausforderung mit deinem Kind in eigenen Worten mit.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">KI-Analyse</h4>
            <p className="text-gray-600">
              Unsere KI versteht die Bedürfnisse deines Kindes und deine Situation.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h4 className="text-xl font-semibold mb-3">Konkrete Hilfe</h4>
            <p className="text-gray-600">
              Erhalte empathische, umsetzbare Lösungsvorschläge in unter 3 Sekunden.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-gray-900">
            Bleib auf dem Laufenden
          </h3>
          <p className="text-xl mb-8 text-gray-600">
            Erhalte Updates zum Launch und exklusive Erziehungstipps.
          </p>
          <NewsletterSignup 
            variant="default" 
            source="landing_newsletter_section"
            className="mx-auto"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-primary/90 backdrop-blur-sm rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Bereit für entspanntere Familienmomente?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Gentlify startet bald. Lass dich benachrichtigen!
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterSignup 
              variant="hero" 
              source="landing_cta"
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 mb-4 md:mb-0">
            &copy; 2024 Gentlify. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4">
            <NewsletterSignup 
              variant="inline" 
              source="footer"
              className="max-w-xs"
            />
          </div>
        </div>
      </footer>
    </div>
  )
}