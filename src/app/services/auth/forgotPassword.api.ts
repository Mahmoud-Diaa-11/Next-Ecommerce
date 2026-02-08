import { ForgetPasswordType } from "@/schema/ForgotPasswordSchema";
import axios from "axios";
import toast from "react-hot-toast";

export default async function forgotPassword(
  values: ForgetPasswordType,
  router: any,
) {
  const loadingId = toast.loading("Loading");
  try {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: values,
    };
    const { data } = await axios.request(options);
    console.log(data);
    if (data.statusMsg == "success") {
      toast.success(data.message);
      router.push("/verifyPasswordCode");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.log(error);
  } finally {
    toast.dismiss(loadingId);
  }
}
