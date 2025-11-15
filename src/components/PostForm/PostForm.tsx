import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import fileUploadServiceObject from "../../appwrite/file_uplod_service";
import appWriteServiceObject from "../../appwrite/appwrite_config";
import { useCallback, useEffect } from "react";
import CustomInput from "../CustomInput";
import RTE from "../RTE";
import SelectButton from "../SelectButton";
import CustomButton from "../CustomButton";

const PostForm = ({
  post,
}: {
  post: {
    title: "";
    slug: "";
    content: "";
    status: "";
    featuredImage: "";
    $id: any;
  };
}) => {
  const { register, handleSubmit, control, setValue, watch, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
        featuredImage: post?.featuredImage || "",
      },
    });

  const navigate = useNavigate();
  // we fecth the user data from the current state of the app
  const userData = useSelector((state: any) => state.initialState.userData);

  const submit = async (data: any) => {
    if (post) {
      const file: any = data.image[0]
        ? fileUploadServiceObject.uploadFile(data.image[0])
        : null;

      // when we uploaded the new file and it got uploaded successfully, then we deleted the older file
      if (file) {
        fileUploadServiceObject.deleteFile(post.featuredImage);
      }
      const updatePost = await appWriteServiceObject.updatePost(post.$id, {
        ...data,
        featuredImages: file ? file.$id : undefined,
      });
      if (updatePost) {
        navigate(`/post/${updatePost.$id}`);
      }
    } else {
      const file = await fileUploadServiceObject.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const createNewPost = await appWriteServiceObject.createPost({
          ...data,
          userId: userData.$id,
        });
        if (createNewPost) {
          navigate(`/post/${createNewPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value: any) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    // we get unsubscribe only from watch function and watch function comes from react-hook-form
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <CustomInput
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <CustomInput
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <CustomInput
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={fileUploadServiceObject.getFilePreviewService(
                post.featuredImage
              )}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <SelectButton
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <CustomButton
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </CustomButton>
      </div>
    </form>
  );
};

export default PostForm;
