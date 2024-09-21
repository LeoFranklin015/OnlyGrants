/* eslint-disable @next/next/no-img-element */
"use client";

import AppLayout from "@/layouts/AppLayout";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

const Card = ({
  name,
  description,
  profileImageUrl,
  coverImageUrl,
}: {
  name: string | undefined;
  description: string | undefined;
  profileImageUrl: string | undefined;
  coverImageUrl: string | undefined;
}) => (
  <div className="rounded-3xl bg-white shadow-lg overflow-hidden a > { } w-full hover:opacity-90 transition hover:shadow-none">
    <Link
      target="_blank"
      href={`/projects/${name}`}
      data-track-event="project-card"
    >
      <div className="w-full relative">
        <div>
          <img
            className="bg-black h-[120px] w-full object-cover rounded-t"
            src={coverImageUrl}
            alt="Project Banner"
          />
        </div>
      </div>
      <div className="p-4 space-y-4 relative">
        <img
          className="object-cover rounded-full border-solid border-2 border-white absolute -top-[24px] "
          src={profileImageUrl}
          alt="Project Banner"
          style={{ height: 48, width: 48 }}
        />
        <div className="truncate mt-4">{name}</div>
        <div className="text-sm md:text-base text-ellipsis line-clamp-4 text-grey-400 leading-relaxed min-h-[96px]">
          <div className="text-sm line-clamp-4">{description}</div>
        </div>
      </div>
    </Link>
  </div>
);

export default function ProjectsIndex() {
  return (
    <AppLayout title="Projects">
      <div className="my-10">
        <h1 className="text-5xl font-bold">Explore Projects</h1>
        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              name={project.title}
              description={project.description}
              profileImageUrl={project.imageUrl}
              coverImageUrl={project.imageUrl}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
