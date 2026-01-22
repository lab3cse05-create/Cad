'use client';

/**
 * 2D CAD Editor - DXF & SVG Generation
 * Powered by Puter.js - NO API KEYS NEEDED!
 */

import { useState, useEffect } from 'react';
import { Download, Save, FileText, Loader2, Image, FileCode } from 'lucide-react';

// Puter.js types
declare global {
  interface Window {
    puter: any;
  }
}

export default function Editor2D() {
  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState<'dxf' | 'svg'>('dxf');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [puterReady, setPuterReady] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  
  // Initialize Puter.js
  useEffect(() => {
    const initPuter = () => {
      const checkPuter = setInterval(() => {
        if (window.puter) {
          clearInterval(checkPuter);
          setPuterReady(true);
          console.log('✅ Puter.js loaded - AI is FREE!');
          
          // Check if user is logged in
          window.puter.auth.getUser()
            .then(setUser)
            .catch(() => setUser(null));
        }
      }, 100);
      
      setTimeout(() => clearInterval(checkPuter), 10000);
    };
    
    initPuter();
  }, []);
  
  // Generate 2D CAD with Puter.js AI (FREE!)
  const handleGenerate = async () => {
    if (!prompt.trim() || !puterReady) return;
    
    setLoading(true);
    setError('');
    
    try {
      console.log(`🎨 Generating ${format.toUpperCase()} with Puter AI (FREE!)...`);
      
      const formatInstructions = format === 'dxf' 
        ? `Generate DXF code for a 2D technical drawing.

Requirements:
- Use proper DXF syntax
- Include HEADER, TABLES, and ENTITIES sections
- Use LAYER 0 for all entities
- All dimensions in millimeters
- Include lines, circles, and arcs as needed

Return ONLY the DXF code, no markdown formatting.`
        : `Generate SVG code for a 2D graphic.

Requirements:
- Proper SVG syntax with viewBox
- Clean, well-structured code
- Use <g> groups for organization
- Add id attributes to elements
- Parametric where possible

Return ONLY the SVG code, no markdown formatting.`;
      
      const fullPrompt = `${formatInstructions}

Description: ${prompt}`;
      
      // Call Puter.js AI - NO API KEY NEEDED!
      const response = await window.puter.ai.chat(fullPrompt, {
        model: 'claude-sonnet-4-5',  // FREE!
        // Alternatives: 'gpt-5', 'gemini-2-flash', 'deepseek-v3'
      });
      
      console.log('✅ AI generation complete!');
      console.log('💰 Cost to developer: $0');
      
      // Extract code from response
      let generatedCode = response;
      if (typeof response === 'object' && response.message) {
        generatedCode = response.message.content[0].text;
      }
      
      // Clean up code (remove markdown)
      generatedCode = generatedCode
        .replace(/```(dxf|svg)?\n?/g, '')
        .replace(/```/g, '')
        .trim();
      
      setCode(generatedCode);
      
    } catch (error: any) {
      console.error('Generation failed:', error);
      setError(error.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Save to Puter cloud
  const handleSave = async () => {
    if (!code || !puterReady) return;
    
    // Check if user is logged in
    if (!user) {
      try {
        const loggedInUser = await window.puter.auth.signIn();
        setUser(loggedInUser);
      } catch (error) {
        setError('Please login to save models');
        return;
      }
    }
    
    try {
      const filename = `model_${Date.now()}.${format}`;
      
      // Save file to Puter cloud storage
      await window.puter.fs.write(`/models/${filename}`, code);
      
      // Save metadata
      await window.puter.kv.set(`model:${filename}`, {
        name: filename,
        type: '2d',
        format: format,
        prompt: prompt,
        created: Date.now()
      });
      
      alert(`✅ Saved to cloud: ${filename}`);
      
    } catch (error) {
      console.error('Save failed:', error);
      setError('Failed to save. Please try again.');
    }
  };
  
  // Export file
  const handleExport = () => {
    if (!code) return;
    
    const blob = new Blob([code], {
      type: format === 'dxf' ? 'application/dxf' : 'image/svg+xml'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `model_${Date.now()}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              2D CAD Editor
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              🆓 Powered by Puter.js - No API keys needed!
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {user ? (
              <span className="text-sm text-gray-600">
                {user.username || user.email}
              </span>
            ) : (
              <button
                onClick={async () => {
                  const u = await window.puter.auth.signIn();
                  setUser(u);
                }}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                Login
              </button>
            )}
            
            <button
              onClick={handleSave}
              disabled={!code || !puterReady}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save to Cloud
            </button>
            
            <button
              onClick={handleExport}
              disabled={!code}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export {format.toUpperCase()}
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-96 bg-white border-r flex flex-col">
          {/* Format Selection */}
          <div className="p-4 border-b">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Output Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormat('dxf')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  format === 'dxf'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileCode className={`w-8 h-8 mb-2 ${format === 'dxf' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">DXF</span>
                <span className="text-xs text-gray-500 mt-1">AutoCAD</span>
              </button>
              
              <button
                onClick={() => setFormat('svg')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  format === 'svg'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image className={`w-8 h-8 mb-2 ${format === 'svg' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">SVG</span>
                <span className="text-xs text-gray-500 mt-1">Vector</span>
              </button>
            </div>
          </div>
          
          {/* Prompt Input */}
          <div className="p-4 border-b">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your {format.toUpperCase()} drawing:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                format === 'dxf'
                  ? "Example: Floor plan 10x8m with 2 windows on north wall, 1 door on east wall"
                  : "Example: Logo with gear shape and company name 'TechCo'"
              }
              className="w-full h-32 px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            
            {error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                {error}
              </div>
            )}
            
            <button
              onClick={handleGenerate}
              disabled={!prompt.trim() || loading || !puterReady}
              className="w-full mt-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating with FREE AI...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate {format.toUpperCase()} (FREE!)
                </>
              )}
            </button>
            
            {!puterReady && (
              <p className="mt-2 text-xs text-orange-600 text-center">
                ⚠️ Loading Puter.js...
              </p>
            )}
          </div>
          
          {/* Example Prompts */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Example Prompts:
            </h3>
            
            <div className="space-y-2">
              {format === 'dxf' ? (
                <>
                  <ExamplePrompt
                    title="Floor Plan"
                    description="10x8m room with windows and door"
                    onClick={() => setPrompt("Create a floor plan for 10x8 meter room with:\n- 2 windows (1.5m wide) on north wall\n- 1 door (0.9m wide) on east wall\n- Kitchen counter (3m) on west wall\n- All dimensions in millimeters")}
                  />
                  <ExamplePrompt
                    title="Circuit Diagram"
                    description="LED flasher with 555 timer"
                    onClick={() => setPrompt("Create circuit schematic for LED flasher:\n- 555 timer IC\n- LED with current limiting resistor\n- Timing capacitors and resistors\n- Power supply connections")}
                  />
                  <ExamplePrompt
                    title="Mechanical Part"
                    description="Bracket with mounting holes"
                    onClick={() => setPrompt("2D technical drawing of L-bracket:\n- 100x80mm outer dimensions\n- 5mm material thickness\n- 4 M8 mounting holes (10mm from edges)\n- All dimensions labeled")}
                  />
                  <ExamplePrompt
                    title="CNC Toolpath"
                    description="Cutting pattern for laser"
                    onClick={() => setPrompt("Create laser cutting pattern:\n- 200x100mm rectangular frame\n- 10mm mounting tabs on sides\n- Decorative cutouts in corners\n- Tool compensation included")}
                  />
                </>
              ) : (
                <>
                  <ExamplePrompt
                    title="Logo Design"
                    description="Gear and wrench logo"
                    onClick={() => setPrompt("Design a logo:\n- Circular gear shape (20 teeth)\n- Wrench crossed through center\n- Company name 'TechCo' below\n- Professional style, 200x200 viewBox")}
                  />
                  <ExamplePrompt
                    title="Icon"
                    description="Settings icon"
                    onClick={() => setPrompt("Create settings icon:\n- Two interlocking gears\n- 48x48px viewBox\n- Single color (black)\n- Clean, simple design")}
                  />
                  <ExamplePrompt
                    title="Flowchart"
                    description="Process diagram"
                    onClick={() => setPrompt("Create flowchart:\n- 4 process steps (rectangles)\n- Decision diamond in middle\n- Arrows connecting steps\n- Labels on each element")}
                  />
                  <ExamplePrompt
                    title="Technical Illustration"
                    description="Exploded view"
                    onClick={() => setPrompt("Create exploded view diagram:\n- 3 stacked components\n- Offset vertically\n- Alignment lines\n- Labels for each part")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Panel: Code View */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">
              {format.toUpperCase()} Code
            </h3>
            <div className="text-sm text-gray-500">
              {code && `${code.length} characters`}
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-gray-900 p-4">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {code || `// ${format.toUpperCase()} code will appear here...

// 🆓 FREE AI Generation with Puter.js:
// • No API keys needed
// • No backend server
// • 500+ AI models available
// • Cloud storage included
// • User authentication built-in
// 
// Developer cost: $0/month!
// User pays: Their own Puter usage
              `}
            </pre>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t px-6 py-3 text-center text-sm text-gray-500">
        🆓 FREE with Puter.js • No API keys • No backend • $0/month developer cost
      </footer>
    </div>
  );
}

// Example Prompt Component
function ExamplePrompt({ title, description, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
    >
      <div className="font-medium text-sm text-gray-900">{title}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </button>
  );
}
