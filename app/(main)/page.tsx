'use client'

import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Link from 'next/link';
import { ArrowRight, Code2, Rocket, CheckCircle, Edit, Component } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from '@/utils/supabase/client';

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [isPortfolio, setIsPortfolio] = useState<boolean>(false)

  const features = [
    { icon: Component, title: "Customizable UI", description: "Select from various UI components for each section to create your unique portfolio" },
    { icon: Code2, title: "Interactive Editor", description: "Real-time updates with a split view of UI components and live portfolio preview" },
    { icon: Rocket, title: "One-Click Deploy", description: "Deploy your portfolio with a single click and share it to the world instantly" },
    { icon: CheckCircle, title: "Developer Focused", description: "Pre-built mobile optimized components for showcasing technical achievements" },
  ]

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("portfolio_data")
          .select()
          .eq("user_id", user.id)
          .single();

        if (!error && data) {
          setIsPortfolio(true);
        }
      }
    }

    checkUser();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        {isPortfolio && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-primary/5 border-primary/20 p-6 mb-16 mx-auto max-w-md">
              <CardContent className="p-0 flex flex-col items-center">
                <h3 className="text-xl font-medium mb-3">Welcome back!</h3>
                <p className="text-muted-foreground mb-4">Continue working on your existing portfolio</p>
                <Link href="/editor">
                  <Button size="lg" className="gap-2" variant="default">
                    <Edit className="h-4 w-4" />
                    Continue Editing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text">
            Craft Your Developer Portfolio in Minutes
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12"
        >
          Showcase your skills, projects, and experience with a professional portfolio. 
          Built by developers, for developers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <Link href="/onboarding">
            <Button
              size="lg"
              className="text-lg h-14 px-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              Create Your Portfolio
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 text-left"
        >
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-background/20 backdrop-blur-sm border-primary/10 transition-all duration-300 hover:shadow-lg"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <CardContent className="p-0">
                <feature.icon className={`w-12 h-12 mb-4 ${hoveredFeature === index ? 'text-primary' : 'text-muted-foreground'} transition-colors duration-300`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
