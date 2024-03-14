import {
  Box,
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import FeedPost from "./FeedPost";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <VStack
            key={index}
            gap={2}
            alignItems={"flex-start"}
            mb={10}
          >
            <Flex gap="2" alignItems={"center"}>
              <SkeletonCircle size="8" />
              <Skeleton height="10px" w={"200px"} />
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => (
          <FeedPost key={post.id} post={post} />
        ))}
      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={"md"} color={"red.400"}>
            Dayuum. Looks like you don&apos;t have any
            friends.
          </Text>
        </>
      )}
    </Container>
  );
};
export default FeedPosts;
