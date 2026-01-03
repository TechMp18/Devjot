import { useState, useEffect } from 'react'
import axios from 'axios'
import Journal from './components/Journal'

function App() {
    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                        DevJot
                    </h1>
                    <p className="text-gray-400 mt-2">Your Personal Developer Journal</p>
                </header>

                <main>
                    <Journal />
                </main>
            </div>
        </div>
    )
}

export default App
