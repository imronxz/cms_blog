import { getPosts, detailPost } from '../../services';
import { useRouter } from 'next/router';
import {
  DetailPostComponent,
  Categories,
  PostWidget,
  Admin,
  Comments,
  CommentForm,
} from '../../components';
import { AdjacentPosts } from '../../sections';


function DetailPost({ post }) {
  return (
    <div className="container mx-auto p-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* TODO: Content Blog */}
        <div className="col-span-1 lg:col-span-8">
          <DetailPostComponent post={post} />
          <Admin admin={post.admin} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          <CommentForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          {/* Sidebar Menu */}
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              kategoris={post.kategoris.map((i) => {
                i.slug;
              })}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await detailPost(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    /* TODO: Mapping posts graphqlcms -> node{ slug } return -> params{ slug } */
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
