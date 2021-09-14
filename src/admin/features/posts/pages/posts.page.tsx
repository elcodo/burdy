import Heading from '@admin/components/heading';
import { composeWrappers } from '@admin/helpers/hoc';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import PostsCommandBar from '../components/posts-command-bar';
import PostsDeleteDialog from '../components/posts-delete-dialog';
import PostsList from '../components/posts-list';
import PostCreateDialog from '../components/post-create-dialog';
import { PostsContextProvider, usePosts } from '../context/posts.context';
import PostSettingsDialog from '../components/post-settings-dialog';
import PostDuplicateDialog from '@admin/features/posts/components/post-duplicate-dialog';
import PostPublishDialog from '@admin/features/posts/components/post-publish-dialog';
import PostUnpublishDialog from '@admin/features/posts/components/post-unpublish-dialog';

const PostsPage = () => {
  const params = useParams<any>();
  const {
    getPosts,
    getOneContentType,
    selectedPosts,
    params: searchParams,
    setParams,

    stateData,
    setStateData,
  } = usePosts();

  useEffect(() => {
    setParams({
      ...(searchParams || {}),
      type: 'post',
      contentTypeId: params?.contentTypeId,
    });
    getPosts.execute({
      type: 'post',
      contentTypeId: params?.contentTypeId,
    });
    getOneContentType.execute(params?.contentTypeId);
  }, [params?.contentTypeId]);

  return (
    <div className="page-wrapper">
      <PostsCommandBar />
      <div
        className="page-content page-content-scroll"
        style={{ padding: '0 1rem' }}
      >
        <Heading
          loading={getOneContentType.loading}
          title={getOneContentType?.result?.name}
        />
        <PostsList />
      </div>
      <PostCreateDialog
        isOpen={stateData?.createPostOpen}
        onCreated={() => {
          setStateData('createPostOpen', false);
        }}
        onDismiss={() => setStateData('createPostOpen', false)}
      />
      <PostsDeleteDialog
        isOpen={stateData?.deletePostsOpen}
        onDeleted={() => {
          setStateData('deletePostsOpen', false);
        }}
        onDismiss={() => setStateData('deletePostsOpen', false)}
      />
      <PostSettingsDialog
        onDismiss={() => setStateData('updatePostOpen', false)}
        onUpdated={() => {
          setStateData('updatePostOpen', false);
        }}
        isOpen={stateData?.updatePostOpen}
        post={selectedPosts?.[0]}
      />
      <PostDuplicateDialog
        onDismiss={() => setStateData('copyPostsOpen', false)}
        onCreated={() => {
          setStateData('copyPostsOpen', false);
        }}
        isOpen={stateData?.copyPostsOpen}
        post={selectedPosts?.[0]}
      />
      <PostPublishDialog
        onDismiss={() => setStateData('publishPostOpen', false)}
        onUpdated={() => {
          setStateData('publishPostOpen', false);
          getPosts.execute(params);
        }}
        disableRecursive
        isOpen={stateData?.publishPostOpen}
        posts={selectedPosts}
      />
      <PostUnpublishDialog
        onDismiss={() => setStateData('unpublishPostOpen', false)}
        onUpdated={() => {
          setStateData('unpublishPostOpen', false);
          getPosts.execute(params);
        }}
        disableRecursive
        isOpen={stateData?.unpublishPostOpen}
        posts={selectedPosts}
      />
    </div>
  );
};

export default composeWrappers({
  postsContext: PostsContextProvider,
})(PostsPage);