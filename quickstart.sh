#!/bin/bash

# Quick Start Script - Just run this to get started!

echo "🚀 NetworkVision ERP - Quick Start"
echo "===================================="
echo ""
echo "This script will:"
echo "1. Install the correct Node.js version (v18)"
echo "2. Install all project dependencies"
echo "3. Start the development server"
echo ""
echo "Press Ctrl+C to cancel, or wait 3 seconds to continue..."
sleep 3

# Run the main setup script
./setup.sh

# Start the development server
echo ""
echo "🎉 Starting development server..."
echo ""
npm run dev
