import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI CAD Platform - FREE with Puter.js',
  description: 'Complete 2D & 3D CAD platform with NO API keys needed!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* 
          🎉 PUTER.JS - ONE LINE FOR EVERYTHING! 
          
          This single script tag provides:
          • 500+ AI models (GPT, Claude, Gemini, Llama) - FREE!
          • Cloud storage - FREE!
          • User authentication - FREE!
          • Database (key-value store) - FREE!
          
          NO API KEYS NEEDED!
          NO BACKEND REQUIRED!
          $0/month DEVELOPER COST!
        */}
        <script src="https://js.puter.com/v2/"></script>
        
        {/* Optional: Puter.js GUI components */}
        <script src="https://js.puter.com/v2/gui"></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
