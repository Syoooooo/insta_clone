import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import { useRef, useState } from "react";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({
  post,
  isProfile,
  creatorProfile,
}) => {
  const [liked, setLiked] = useState(false);
  const { isCommenting, handlePostComment } =
    usePostComment();
  const [comment, setComment] = useState("");
  const AuthUser = useAuthStore((state) => state.user);
  const commentRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleLikePost, isLiked, likes } =
    useLikePost(post);

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} marginTop={"auto"}>
      <Flex
        alignItems={"center"}
        gap={4}
        w={"full"}
        pt={0}
        mb={2}
        mt={4}
      >
        <Box
          onClick={handleLikePost}
          cursor={"pointer"}
          fontSize={18}
        >
          {!isLiked ? (
            <NotificationsLogo />
          ) : (
            <UnlikeLogo />
          )}
        </Box>

        <Box
          cursor={"pointer"}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontSize={"small"} fontWeight={600}>
        {likes} likes
      </Text>
      {isProfile && (
        <Text fontSize="12" color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
      {!isProfile && (
        <>
          <Text fontSize={"small"} fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as="span" fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          <Text fontSize={"small"} color={"gray"}>
            {post.comments.length > 0 && (
              <Text
                fontSize="sm"
                color={"gray"}
                cursor={"pointer"}
                onClick={onOpen}
              >
                View all {post.comments.length} comments
              </Text>
            )}
          </Text>
          {/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
          {isOpen && (
            <CommentsModal
              isOpen={isOpen}
              onClose={onClose}
              post={post}
            />
          )}
        </>
      )}

      {AuthUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                transition={"0.2s ease-in-out"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};
export default PostFooter;
