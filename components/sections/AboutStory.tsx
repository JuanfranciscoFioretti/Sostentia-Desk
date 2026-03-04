"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function AboutStory() {
  const t = useTranslations("about.story");
  return (
    <Section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-strong rounded-3xl p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
              {t("title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center whitespace-pre-line">
              {t("content")}
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}