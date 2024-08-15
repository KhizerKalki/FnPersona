import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCalculator,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
  IconUsers,
} from "@tabler/icons-react";
import Section from "../section/Section";

export const FeaturesSection = () => {
  const features = [
    {
      title: "Collaborate with Family",
      description:
        "Easily manage and share your financial goals with family members, ensuring everyone stays on the same page.",
      icon: <IconUsers />,
    },
    {
      title: "Intuitive Interface",
      description:
        "Experience a user-friendly interface that’s as easy to navigate as a mobile app.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Flexible Pricing",
      description:
        "Competitive pricing with no hidden fees, and flexible plans to fit your needs.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Reliable Performance",
      description:
        "Enjoy a robust system with high availability and consistent uptime.",
      icon: <IconCloud />,
    },
    {
      title: "Comprehensive Financial Tools",
      description:
        "Manage all your finances in one place with powerful, integrated tools.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Support",
      description:
        "We are available around the clock to assist you, with AI agents ready to help anytime.",
      icon: <IconHelp />,
    },
    {
      title: "Tax Efficiency Strategies",
      description:
        "Optimize your financial planning with built-in tax efficiency tools and advice.",
      icon: <IconCalculator />,
    },
    {
      title: "Everything Else You Need",
      description: "A complete financial management solution tailored to your needs.",
      icon: <IconHeart />,
    },
  ];

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </Section>
  );
};

const Feature = ({ title, description, icon, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </motion.div>
  );
};
