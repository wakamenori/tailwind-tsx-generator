/** @type {import('next').NextConfig} */
const fs = require('fs')

const FILE_PATH = './src/components/render/GeneratedCode.tsx'

const FILE_COTENT = `import React from 'react';

const HelloWorld: React.FC = () => {
  return <div>Hello, World!</div>;
};

export default HelloWorld;`

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
