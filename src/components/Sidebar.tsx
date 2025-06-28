
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Book, Atom, FlaskConical, Dna } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chapter {
  id: number;
  title: string;
  completed: boolean;
}

interface Subject {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  chapters: Chapter[];
}

const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: Book,
    color: 'bg-blue-500',
    chapters: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}: ${['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry', 'Probability', 'Functions', 'Equations'][i % 8]}`,
      completed: Math.random() > 0.7
    }))
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: Atom,
    color: 'bg-purple-500',
    chapters: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}: ${['Mechanics', 'Thermodynamics', 'Waves', 'Optics', 'Electricity', 'Magnetism', 'Modern Physics', 'Quantum'][i % 8]}`,
      completed: Math.random() > 0.7
    }))
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: FlaskConical,
    color: 'bg-green-500',
    chapters: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}: ${['Atomic Structure', 'Bonding', 'Reactions', 'Solutions', 'Acids & Bases', 'Organic', 'Kinetics', 'Equilibrium'][i % 8]}`,
      completed: Math.random() > 0.7
    }))
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: Dna,
    color: 'bg-orange-500',
    chapters: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      title: `Chapter ${i + 1}: ${['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Anatomy', 'Physiology', 'Biochemistry', 'Molecular'][i % 8]}`,
      completed: Math.random() > 0.7
    }))
  }
];

interface Props {
  onChapterSelect: (subject: string, chapter: Chapter) => void;
  selectedChapter: { subject: string; chapter: Chapter } | null;
}

const Sidebar: React.FC<Props> = ({ onChapterSelect, selectedChapter }) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSubject = (subjectId: string) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto",
      collapsed ? "w-16" : "w-80"
    )}>
      <div className="p-4 border-b border-gray-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-between text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          {!collapsed && <span>Subjects</span>}
          <ChevronRight className={cn("transition-transform", collapsed ? "rotate-0" : "rotate-90")} />
        </button>
      </div>

      <div className="p-2">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isExpanded = expandedSubject === subject.id;
          
          return (
            <div key={subject.id} className="mb-2">
              <button
                onClick={() => toggleSubject(subject.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className={cn("p-2 rounded-lg text-white", subject.color)}>
                  <Icon size={20} />
                </div>
                {!collapsed && (
                  <>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 flex-1 text-left">
                      {subject.name}
                    </span>
                    <ChevronDown className={cn(
                      "transition-transform duration-200",
                      isExpanded ? "rotate-180" : "rotate-0"
                    )} />
                  </>
                )}
              </button>

              {isExpanded && !collapsed && (
                <div className="ml-4 mt-2 space-y-1 animate-accordion-down">
                  {subject.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => onChapterSelect(subject.id, chapter)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-2",
                        selectedChapter?.subject === subject.id && selectedChapter.chapter.id === chapter.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50 text-gray-600"
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        chapter.completed ? "bg-green-400" : "bg-gray-300"
                      )} />
                      <span className="text-sm">{chapter.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
