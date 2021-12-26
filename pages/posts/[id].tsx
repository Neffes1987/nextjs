import Layout from '../../components/Layout'
import {GetStaticPathsResult, NextPage} from "next";
import {getPostData} from "../../lib/Posts/posts.utils";
import {GetStaticPropsContext} from "next/types";
import Head from "next/head";
import {format, parseISO} from "date-fns";
import {POSTS_IDS} from "../../lib/Posts/posts.contants";
import {PostProps} from "../../lib/Posts/posts.interface";

export  const Post: NextPage<PostProps> = ({post}) => {
  return <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      {post.id}
      <br />
      {format(parseISO(post.date), 'LLLL d, yyyy')}
      <br />
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
  </Layout>
}

export async function getStaticProps({ params }: GetStaticPropsContext<Record<string, string>>){
  return {
    props : {
      post: await getPostData(params?.id ?? '')
    }
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: POSTS_IDS,
    fallback: false
  }
}

export default  Post;
