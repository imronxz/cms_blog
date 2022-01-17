import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { PostCard, PostWidget, Categories } from '../components';

const posts = [
  { title: 'React Testing', kutipan: 'Learn Next JS' },
  { title: 'React with Tailwind', kutipan: 'Learn Next JS with Tailwind' },
];

export default function Home() {
  return (
    <div className="container mx-auto px-10 mb-8 bg-gray-500">
      <head>
        <title>Graphcms Blog</title>
        <link rel="icon" href="favicon.ico" />
      </head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
