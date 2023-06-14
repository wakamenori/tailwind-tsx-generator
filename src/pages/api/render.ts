import { NextApiResponse, NextApiRequest } from 'next'
import ts from 'typescript'
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'
import fs from 'fs'
import path from 'path'

const NO_ERROR_COMPONENT = `import React from 'react';

const HelloWorld: React.FC = () => {
  return <div>Hello, World!</div>;
};

export default HelloWorld;`

function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content)
}
const render = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }
  const { tsxCode } = req.body
  const filePath = 'src/components/render/GeneratedCode.tsx'
  writeFile(filePath, tsxCode)
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    let ast

    try {
      ast = parser.parse(fileContent, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      })
    } catch (error) {
      writeFile(filePath, NO_ERROR_COMPONENT)
      res.status(500).json({ message: 'Error parsing file' })
      return
    }

    let defaultExported = false

    traverse(ast, {
      ExportDefaultDeclaration() {
        defaultExported = true
      },
    })
    if (defaultExported) {
      res.status(201).json({ message: 'File created' })
      return
    } else {
      writeFile(filePath, NO_ERROR_COMPONENT)
      res.status(500).json({ message: 'Error parsing file' })
      return
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error creating file' })
  }
}
export default render
