// components/DiseaseInfo.tsx
'use client'

import { motion } from 'framer-motion'
import { GiPlantRoots, GiSpotedFlower, GiChemicalDrop, GiHealthNormal, GiCalendarHalfYear } from 'react-icons/gi'

const SectionIcon: React.FC<{ title: string }> = ({ title }) => {
  const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'overview': GiPlantRoots,
    'symptoms': GiSpotedFlower,
    'cycle': GiCalendarHalfYear,
    'risk': GiHealthNormal,
    'prevention': GiHealthNormal,
    'treatment': GiChemicalDrop,
    'monitoring': GiCalendarHalfYear,
    'case': GiPlantRoots,
    'management': GiHealthNormal,
    'checklist': GiCalendarHalfYear,
    'frequency': GiCalendarHalfYear
  }

  const normalizedTitle = title.toLowerCase().replace(/[^a-z]/g, '')
  const IconComponent = iconMap[normalizedTitle] || GiPlantRoots
  
  return (
    <div className="p-2 bg-teal-50 rounded-lg">
      <IconComponent className="w-5 h-5 text-teal-600" />
    </div>
  )
}

const renderMarkdownLine = (line: string, lineIndex: number, content: string) => {
  if (!content) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-700"
      >
        No disease information available
      </motion.div>
    )
  }
  if (!line.trim()) return null

  // Handle bullet points
  if (line.trim().startsWith('* ')) {
    return (
      <li key={lineIndex} className="text-gray-700 mb-1 leading-relaxed list-disc ml-5">
        {renderMarkdownText(line.replace('* ', ''))}
      </li>
    )
  }

  // Handle bold formatting (**text**)
  return (
    <p key={lineIndex} className="text-gray-700 mb-2 leading-relaxed">
      {renderMarkdownText(line)}
    </p>
  )
}

const renderMarkdownText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-semibold text-gray-800">
          {part.slice(2, -2)}
        </span>
      )
    }
    return part
  })
}

export default function DiseaseInfo({ content }: { content: string }) {
  if (content.startsWith('Error:') || content.startsWith('Unexpected')) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 text-red-700"
      >
        <div className="flex items-center gap-2">
          <GiPlantRoots className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Error Generating Report</h3>
        </div>
        <p className="mt-1">{content}</p>
      </motion.div>
    )
  }

  const sections = content.split('##').slice(1)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-6 space-y-6"
    >
      {sections.map((section, index) => {
        const [heading, ...body] = section.split('\n').filter(l => l.trim())
        const bodyText = body.join('\n')
        
        return (
          <motion.div
            key={index}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex gap-3 items-start mb-3">
              <SectionIcon title={heading} />
              <h3 className="text-lg font-semibold text-gray-800">
                {heading.replace(/\*\*/g, '').trim()}
              </h3>
            </div>
            
            <div className="pl-9">
              {bodyText.split('\n').map((line, i) => renderMarkdownLine(line, i, content))}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}