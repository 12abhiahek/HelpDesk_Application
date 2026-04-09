import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { MessageSquare, Users, Clock, Shield, Zap, HeadphonesIcon, Bot } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import heroImg from '../assets/hero.png'

function ChatHome() {
  const navigate = useNavigate()

  const handleStartChat = () => {
    navigate('/chat')
  }

  const features = [
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Instant messaging with our support team for immediate assistance."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Connect with qualified professionals who understand your needs."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Get help anytime, day or night, with round-the-clock support."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are encrypted and protected with enterprise-grade security."
    },
    {
      icon: Zap,
      title: "Quick Resolution",
      description: "Fast-track your issues with our efficient problem-solving approach."
    },
    {
      icon: HeadphonesIcon,
      title: "Multiple Channels",
      description: "Chat, voice, or video support - choose what works best for you."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <Bot    className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">HelpDesk</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Welcome to <span className="text-blue-600">HelpDesk</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Get instant support from our expert team. We're here to help you resolve issues quickly and efficiently.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleStartChat}
                size="lg"
                className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white  cursor-pointer"
               
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Chat Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Avg. 2min Response</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImg}
                alt="HelpDesk Support"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our HelpDesk?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the difference with our comprehensive support system designed for modern businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-gray-100 to-purple-600 border-0 shadow-2xl">
          <CardContent className="p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust our helpdesk system.
            </p>
            <Button
              onClick={handleStartChat}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 cursor-pointer"
            >   
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Your Conversation
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">HelpDesk</h4>
              <p className="text-gray-400">
                Professional support solutions for modern businesses.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>24/7 Live Chat</li>
                <li>Email Support</li>
                <li>Knowledge Base</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HelpDesk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ChatHome