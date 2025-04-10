import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../validation/signupSchema";

const Signup = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log('Submitting form data:', JSON.stringify(data, null, 2));
      const response = await signup(data).unwrap();
      console.log('Signup successful:', response);
      navigate("/login");
    } catch (err) {
      console.error('Signup error details:', {
        status: err.status,
        data: err.data,
        message: err.message
      });
      
      // Set form error with more detailed message
      setFormError("root", {
        type: "manual",
        message: err.message || "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {errors.root && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.root.message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Enter your name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              {...register("role")}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
