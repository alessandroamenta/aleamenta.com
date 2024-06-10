import { Suspense } from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import Image from 'next/image';
//import smashing from 'public/images/home/smashing.jpg';
//import reactathon from 'public/images/home/reactathon.jpg';
//import ship from 'public/images/home/ship.jpg';
//import filming from 'public/images/home/filming.jpg';
//import meetups from 'public/images/home/meetups.jpg';
//import vercel from 'public/images/home/vercel.jpg';
import building from 'public/images/home/building.png';
import reading from 'public/images/home/reading.jpeg';
import github from 'public/images/home/github.png';
import githubpic from 'public/images/home/githubpic.png';
import paulg from 'public/images/home/paulg.png';
import runclub from 'public/images/home/runclub.jpeg';
import running from 'public/images/home/running.jpeg';
import hustling from 'public/images/home/hustling.jpeg';
import cooking from 'public/images/home/cooking.jpeg';
import avatar from 'app/avatar.jpg';
import avatar1 from 'app/avatar1.png';
import ViewCounter from 'app/blog/view-counter';
import { PreloadResources } from 'app/preload';
import { getViewsCount } from 'app/db/queries';

function Badge(props) {
  return (
    <a
      {...props}
      target="_blank"
      className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChannelLink({ img, link, name, logo }) {
  return (
    <div className="group flex w-full">
      <a
        href={link}
        target="_blank"
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex items-center space-x-3">
          <div className="relative h-16">
            <Image
              alt={name}
              src={img}
              height={64}
              width={64}
              sizes="33vw"
              className="h-16 w-16 rounded-full border border-neutral-200 dark:border-neutral-700"
              priority
            />
            <div
              className="relative -right-10 -top-6 inline-flex h-6 w-6 items-center rounded-full border border-neutral-200 p-1 dark:border-neutral-700"
              style={{ backgroundColor: logo === 'linkedin' ? '#0077B5' : 'black' }}
            >
            {logo === 'twitter' ? (
                <img role="img" aria-label="twitter logo" src="/x.jpg" />
              ) : logo === 'medium' ? (
                <img role="img" aria-label="medium logo" src="/medium.png" />
              ) : logo === 'linkedin' ? (
                <img role="img" aria-label="linkedin logo" src="/linkedin.png" />
              ) : logo === 'github' ? (
                <img role="img" aria-label="github logo" src="/github.png" />
              ) : null}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {name}
            </p>
            <Suspense fallback={<p className="h-6" />}>
            </Suspense>
          </div>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}



function BlogLink({ slug, name }) {
  return (
    <div className="group">
      <a
        href={`/blog/${slug}`}
        className="flex w-full items-center justify-between rounded border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <div className="flex flex-col">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          <Suspense fallback={<p className="h-6" />}>
            <Views slug={slug} />
          </Suspense>
        </div>
        <div className="transform text-neutral-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-neutral-300">
          <ArrowIcon />
        </div>
      </a>
    </div>
  );
}

async function Views({ slug }: { slug: string }) {
  let views = await getViewsCount();
  return <ViewCounter allViews={views} slug={slug} />;
}

export default function Page() {
  return (
    <section>
      <PreloadResources />
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        hey, I'm Ale 👋
      </h1>
      <p className="mb-4 prose prose-neutral dark:prose-invert">
        {`I'm a self-taught full-stack engineer and indie hacker. I currently work`}
        {` as an AI Engineer at `}
        <span className="not-prose">
          <Badge href="https://www.nexler.nl/">

            Nexler
          </Badge>
        </span>
        {`, a dutch startup where I help automate all boring tasks using AI. `}

        {`I also run a `}
        <Link href="https://4amdev.framer.ai/">dev agency </Link>
        {`where I partner with solopreneurs and startup founders to build proof of concepts and MVPs.`}
      </p>
      <p className="prose prose-neutral dark:prose-invert">
        {`On nights and weekeds, I spend my time building my own indie projects. I'm always working on something new and try to ship a new product on a monthly cadence. I enjoy running, travelling, cooking (duh, I'm Italian 🙄) and reading. Here are some random recent images of moments spent doing my favorite things. :)`}
      </p>
      <div className="grid grid-cols-2 grid-rows-4 sm:grid-rows-3 sm:grid-cols-3 gap-4 my-8">
        <div className="relative h-40">
          <Image
            alt="Coding up my indie startups"
            src={building}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative sm:row-span-2 row-span-1">
          <Image
            alt="An essay i love from paulg"
            src={paulg}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative">
          <Image
            alt="Me and the run club"
            src={runclub}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative row-span-2">
          <Image
            alt="What my solo running route in amsterdam looks like"
            src={running}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover sm:object-center"
          />
        </div>
        <div className="relative row-span-2">
          <Image
            alt="Gym day, every day"
            src={hustling}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40">
          <Image
            alt="Lasagna, made how my grandma taught me to make it."
            src={cooking}
            fill
            sizes="(max-width: 768px) 213px, 33vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="mb-4 prose prose-neutral dark:prose-invert">
      <p>
        Some tech I love building with:
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge href="https://nextjs.org">
          <img
            alt="Next.js logomark"
            src="/next-logo.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Next.js
        </Badge>
        <Badge href="https://react.dev">
          <svg
            width="14"
            height="14"
            role="img"
            aria-label="React logo"
            className="!mr-1"
          >
            <use href="/sprite.svg#react" />
          </svg>
          React
        </Badge>
        <Badge>
          <img
            alt="python logo"
            src="/python.png"
            className="!mr-1"
            width="14"
            height="14"
          />
          Python
        </Badge>
        <Badge>
          <img
            alt="ts logomark"
            src="/typescript.png"
            className="!mr-1"
            width="14"
            height="14"
          />
          Typescript
        </Badge>
        <Badge href="https://ui.shadcn.com/">
          <img
            alt="shadcn logomark"
            src="/shadcn.png"
            className="!mr-1"
            width="14"
            height="14"
          />
          Shacn-ui
        </Badge>
        <Badge href="https://supabase.com/">
          <img
            alt="supabase logomark"
            src="/supabase.png"
            className="!mr-1"
            width="14"
            height="14"
          />
          Supabase
        </Badge>
      </div>
    </div>
    <div className="mb-2 prose prose-neutral dark:prose-invert">
      <p>
        Posting daily on X and writing tech articles on Medium monthly. Mostly about my learnings as a self-taught developer and the projects I'm building :)
      </p>
      <div className="flex flex-wrap gap-2">
    </div>
    </div>
    <div className="my-8 flex flex-col space-y-4">
  <div className="flex space-x-4">
    <ChannelLink
      img={avatar}
      name="@ale_amenta"
      link="https://x.com/ale_amenta"
      logo="twitter"
    />
    <ChannelLink
      img={avatar1}
      name="@alessandroamenta1"
      link="https://medium.com/@alessandroamenta1"
      logo="medium"
    />
  </div>
  <div className="flex space-x-4">
    <ChannelLink
      img={githubpic}
      name="@alessandroamenta"
      link="https://github.com/alessandroamenta"
      logo="github"
    />
    <ChannelLink
      img={avatar1}
      name="Alessandro Amenta"
      link="https://www.linkedin.com/in/alessandro-amenta/"
      logo="linkedin"
    />
  </div>
</div>

      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/ale_amenta"
          >
            <ArrowIcon />
            <p className="ml-2 h-7">follow me</p>
          </a>
        </li>

      </ul>
    </section>
  );
}
