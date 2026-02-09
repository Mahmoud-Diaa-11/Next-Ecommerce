import { resetPasswordType } from "@/schema/ResetPasswordSchema";
import axios from "axios";
import toast from "react-hot-toast";

export default async function resetPassword(
  values: resetPasswordType,
  router: any,
) {
  const loadingId = toast.loading("Loading");
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      method: "PUT",
      data: values,
    };
    const { data } = await axios.request(options);
    if (data.token) {
      toast.success("success");
      router.push("/login");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
  } finally {
    toast.dismiss(loadingId);
  }
}
