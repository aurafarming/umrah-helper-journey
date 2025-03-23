
import React, { useState } from 'react';
import { Check, Book, ChevronRight, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RitualStep {
  id: number;
  title: string;
  description: string;
  details: string;
  image?: string;
  tips?: string[];
}

interface RitualCategory {
  id: string;
  title: string;
  description: string;
  steps: RitualStep[];
}

// Umrah ritual steps data
const umrahRituals: RitualCategory[] = [
  {
    id: 'preparations',
    title: 'Preparation',
    description: 'Essential preparations before beginning Umrah',
    steps: [
      {
        id: 1,
        title: 'Niyyah (Intention)',
        description: 'Form the sincere intention to perform Umrah for Allah alone',
        details: 'Before beginning your journey, make a sincere intention (niyyah) in your heart to perform Umrah solely for the pleasure of Allah. The intention does not need to be verbal but should be present in your heart.',
        tips: [
          'Reflect on the significance of the journey',
          'Free your heart from worldly distractions',
          'Focus on spiritual growth and seeking Allah\'s pleasure'
        ]
      },
      {
        id: 2,
        title: 'Ihram (Sacred State)',
        description: 'Enter the state of Ihram before reaching the designated boundary (Miqat)',
        details: 'Ihram refers to both the special clothing worn and the sacred state entered for Umrah. Men wear two white unstitched sheets, while women wear normal modest clothing. After wearing Ihram, certain actions become prohibited.',
        tips: [
          'Men: Wear two white unstitched sheets',
          'Women: Wear modest, regular Islamic clothing',
          'Take a shower and apply unscented soap before wearing Ihram',
          'Avoid using perfumes or scented products after entering Ihram'
        ]
      },
      {
        id: 3,
        title: 'Talbiyah',
        description: 'Recite the Talbiyah after entering Ihram',
        details: 'After entering Ihram, recite the Talbiyah frequently: "Labbayk Allahumma labbayk, labbayk la shareeka laka labbayk, innal hamda wan-ni\'mata laka wal-mulk, la shareeka lak" (Here I am O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner).',
        tips: [
          'Men should recite the Talbiyah loudly',
          'Women should recite it quietly',
          'Continue reciting until you begin Tawaf around the Kaaba'
        ]
      }
    ]
  },
  {
    id: 'tawaf',
    title: 'Tawaf',
    description: 'Circumambulation of the Kaaba seven times',
    steps: [
      {
        id: 1,
        title: 'Begin at the Black Stone',
        description: 'Start Tawaf from the Black Stone (Hajar al-Aswad)',
        details: 'Begin your Tawaf from the corner where the Black Stone is located. If possible, touch or kiss the Black Stone. If not, simply face it and point towards it saying "Bismillah, Allahu Akbar" (In the name of Allah, Allah is the Greatest).',
        tips: [
          'Don\'t push or harm others trying to reach the Black Stone',
          'During crowded times, it\'s sufficient to face it and point from a distance',
          'Men should expose their right shoulder during Tawaf (idtiba\')'
        ]
      },
      {
        id: 2,
        title: 'Complete Seven Circuits',
        description: 'Circle the Kaaba seven times in a counterclockwise direction',
        details: 'Circle the Kaaba seven times in a counterclockwise direction, keeping the Kaaba on your left side at all times. Make supplications and remember Allah during each circuit. Each circuit begins and ends at the Black Stone.',
        tips: [
          'Walk at a normal pace (brisk walking for men in the first three rounds is sunnah)',
          'Maintain focus on worship rather than conversation',
          'Avoid crossing directly in front of people who are praying'
        ]
      },
      {
        id: 3,
        title: 'Pray at Maqam Ibrahim',
        description: 'After completing Tawaf, pray two rak\'ahs behind Maqam Ibrahim',
        details: 'After completing seven circuits, cover your right shoulder (if exposed) and pray two rak\'ahs preferably behind Maqam Ibrahim (the Station of Ibrahim) or anywhere else in the sacred mosque. Recite Surah Al-Kafirun in the first rak\'ah and Surah Al-Ikhlas in the second rak\'ah.',
        tips: [
          'If the area behind Maqam Ibrahim is crowded, pray anywhere in the mosque',
          'Keep the prayer brief but focused',
          'This prayer is an essential part of Tawaf'
        ]
      },
      {
        id: 4,
        title: 'Drink Zamzam Water',
        description: 'Drink Zamzam water after completing the prayer',
        details: 'After prayer, proceed to the Zamzam well area to drink the blessed water. Drink to your fill while standing and facing the Qibla. Make dua as the Prophet Muhammad (peace be upon him) said: "Zamzam water is for whatever it is drunk for."',
        tips: [
          'Make specific dua for healing or specific needs',
          'Drink slowly and mindfully',
          'Say "Bismillah" before drinking'
        ]
      }
    ]
  },
  {
    id: 'saee',
    title: 'Sa\'ee',
    description: 'Walking between Safa and Marwah seven times',
    steps: [
      {
        id: 1,
        title: 'Begin at As-Safa',
        description: 'Start Sa\'ee at Mount Safa',
        details: 'Proceed to Mount Safa and climb it (or the area marking it). Face the Kaaba and raise your hands in supplication, saying: "Allahu Akbar" three times followed by dua. Begin walking towards Marwah at a normal pace.',
        tips: [
          'Recite: "Innas-safa wal marwata min sha\'a\'irillah" (Verily, As-Safa and Al-Marwah are among the symbols of Allah)',
          'Make personal supplications facing the Kaaba',
          'Remember the struggle of Hajar (may Allah be pleased with her)'
        ]
      },
      {
        id: 2,
        title: 'Walk to Al-Marwah',
        description: 'Walk from Safa to Marwah, completing seven trips total',
        details: 'Walk from Safa to Marwah, and when you reach the marked green lights (for men only), quicken your pace if possible. Upon reaching Marwah, climb it (or the area marking it), face the Kaaba, raise your hands and make the same supplications as at Safa.',
        tips: [
          'Men should jog lightly between the green lights',
          'Women walk at a normal pace throughout',
          'Each lap between the two hills counts as one (Safa to Marwah = 1, Marwah to Safa = 2, etc.)'
        ]
      },
      {
        id: 3,
        title: 'Complete Seven Trips',
        description: 'Finish at Al-Marwah after completing seven trips between the hills',
        details: 'Continue walking between Safa and Marwah until you have completed seven trips, ending at Marwah. Make supplications throughout the Sa\'ee and reflect on the patience and trust in Allah demonstrated by Hajar.',
        tips: [
          'Keep count of your laps carefully',
          'Use the floors or ask companions to help track your count',
          'Remember that Sa\'ee commemorates Hajar\'s search for water for her son Isma\'il'
        ]
      }
    ]
  },
  {
    id: 'completion',
    title: 'Completion',
    description: 'Final steps to complete Umrah',
    steps: [
      {
        id: 1,
        title: 'Hair Cutting/Shaving',
        description: 'Men should shave or trim their hair; women trim a fingertip\'s length',
        details: 'After completing Sa\'ee, men should either shave their entire head (preferable) or cut their hair equally from all parts of the head. Women should trim the length of a fingertip from their hair. This act symbolizes the completion of Umrah.',
        tips: [
          'Men: Shaving the entire head is more rewarding but trimming is acceptable',
          'Women: Never shave the head, only trim a small amount',
          'Ensure hair cutting is done within the boundary of Haram'
        ]
      },
      {
        id: 2,
        title: 'Exiting Ihram',
        description: 'With hair cutting/shaving, the state of Ihram ends',
        details: 'With the completion of hair cutting or shaving, the restrictions of Ihram end, and you can resume normal activities and wear regular clothes. This marks the completion of your Umrah.',
        tips: [
          'Change out of Ihram garments after trimming/shaving',
          'All prohibitions of Ihram are now lifted',
          'Offer prayers of gratitude for completing the Umrah'
        ]
      }
    ]
  }
];

const UmrahGuide: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('preparations');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepCompletion = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  return (
    <Card className="floating-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Book className="mr-2 h-5 w-5 text-primary" />
          Umrah Guide
        </CardTitle>
        <CardDescription>
          Step-by-step guide to performing Umrah rituals correctly
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs 
          defaultValue="preparations" 
          value={selectedTab} 
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            {umrahRituals.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs sm:text-sm"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {umrahRituals.map((category) => (
            <TabsContent key={category.id} value={category.id} className="animate-slide-up">
              <div className="space-y-6">
                {category.steps.map((step) => (
                  <div 
                    key={step.id}
                    className={cn(
                      "border rounded-lg p-4 transition-all duration-250",
                      completedSteps.includes(step.id) 
                        ? "bg-green-50 border-green-200" 
                        : "hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-medium">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <Button 
                        variant={completedSteps.includes(step.id) ? "default" : "outline"} 
                        size="sm"
                        className={completedSteps.includes(step.id) ? "bg-green-600 hover:bg-green-700" : ""}
                        onClick={() => toggleStepCompletion(step.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        {completedSteps.includes(step.id) ? "Completed" : "Mark Complete"}
                      </Button>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`step-${step.id}`} className="border-b-0">
                        <AccordionTrigger className="py-2 text-sm font-medium">
                          View Details
                        </AccordionTrigger>
                        <AccordionContent className="text-sm">
                          <div className="space-y-3 pt-2">
                            <p>{step.details}</p>
                            
                            {step.tips && step.tips.length > 0 && (
                              <div className="mt-3">
                                <Badge variant="outline" className="mb-2">Important Tips</Badge>
                                <ul className="space-y-1">
                                  {step.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start">
                                      <ChevronRight className="h-4 w-4 mr-1 text-primary shrink-0 mt-0.5" />
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UmrahGuide;
