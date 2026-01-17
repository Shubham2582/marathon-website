"use client";

import React, { useState } from "react";
import { CheckCircle2, Lock, User, MapPin, Phone, Shirt, Clock, XCircle } from "lucide-react";

const ADMIN_PASSWORD = "abujhmaad2026";
const T_SHIRT_SIZES = ["S", "M", "L", "XL", "XXL"];

interface FormData {
  fullName: string;
  gender: "MALE" | "FEMALE" | "";
  mobile: string;
  pincode: string;
  state: string;
  city: string;
  tShirtSize: string;
}

interface RegistrationResult {
  identificationNumber: string;
  bibNumber: number | null;
  firstName: string;
  lastName: string;
  city: string;
  paymentStatus: string;
  receivedTshirt: boolean;
}

const SimpleRegistration = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [form, setForm] = useState<FormData>({
    fullName: "",
    gender: "",
    mobile: "",
    pincode: "",
    state: "",
    city: "",
    tShirtSize: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [registrationResult, setRegistrationResult] =
    useState<RegistrationResult | null>(null);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password");
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePincodeChange = async (value: string) => {
    handleChange("pincode", value);

    if (!value) {
      setForm((prev) => ({ ...prev, state: "", city: "" }));
      return;
    }

    if (value.length === 6) {
      setIsPincodeLoading(true);
      try {
        // Simulated API call - replace with actual fetchAddressFromPincode
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockAddress = { State: "Maharashtra", District: "Mumbai" };
        setForm((prev) => ({
          ...prev,
          state: mockAddress.State,
          city: mockAddress.District,
        }));
      } catch (error) {
        setForm((prev) => ({ ...prev, state: "", city: "" }));
        setErrors((prev) => ({
          ...prev,
          pincode: "Invalid pincode",
        }));
      } finally {
        setIsPincodeLoading(false);
      }
    }
  };

  const splitName = (fullName: string) => {
    const nameParts = fullName.trim().split(/\s+/);
    if (nameParts.length === 1) {
      return { firstName: nameParts[0], lastName: "" };
    }
    const lastName = nameParts.pop() || "";
    const firstName = nameParts.join(" ");
    return { firstName, lastName };
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    if (!form.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (form.mobile.length !== 10) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (form.pincode.length !== 6) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    if (!form.city.trim()) {
      newErrors.city = "City is required (enter valid pincode)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (paymentStatus: "DONE" | "PENDING" | "OFFLINE", forceNoTshirt: boolean = false) => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const identificationNumber = `REG${Date.now()}`;
      const { firstName, lastName } = splitName(form.fullName);

      const wantsTshirt = !forceNoTshirt && form.tShirtSize.trim() !== "";
      const receivedTshirt = paymentStatus === "DONE" && wantsTshirt;

      const registrationData = {
        first_name: firstName,
        last_name: lastName,
        email: "simple@registration.com",
        mobile: form.mobile,
        gender: form.gender,
        date_of_birth: "2000-01-01",
        country: "India",
        state: form.state,
        city: form.city,
        occupation: "N/A",
        race_category: "21KM",
        t_shirt_size: wantsTshirt ? form.tShirtSize : "N/A",
        emergency_contact_name: "N/A",
        emergency_contact_number: form.mobile,
        blood_group: "O+",
        is_from_narayanpur: form.city.toLowerCase() === "narayanpur",
        is_international: false,
        needs_accommodation: false,
        identification_number: identificationNumber,
        govt_id: "N/A",
        payment_status: paymentStatus,
        previous_marathon_name: null,
        previous_marathon_rank: null,
        wants_tshirt: wantsTshirt,
        received_tshirt: receivedTshirt,
      };

      // Simulated database insertion
      console.log("Registering:", registrationData);
      await new Promise(resolve => setTimeout(resolve, 1000));

      let bibNumber: number | null = null;
      if (paymentStatus === "DONE") {
        bibNumber = Math.floor(1000 + Math.random() * 9000);
      }

      setRegistrationResult({
        identificationNumber,
        bibNumber,
        firstName,
        lastName,
        city: form.city,
        paymentStatus,
        receivedTshirt,
      });

      // Reset form
      setForm({
        fullName: "",
        gender: "",
        mobile: "",
        pincode: "",
        state: "",
        city: "",
        tShirtSize: "",
      });
    } catch (error) {
      console.error("Error saving registration:", error);
      setErrors({ submit: "Failed to save registration. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForNewRegistration = () => {
    setRegistrationResult(null);
  };

  // Password Gate Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100">
        <section className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-6 border border-purple-100 mx-4">
          <div className="mb-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Admin Access
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter password to access simple registration
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3 border border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 focus:outline-none"
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            <button type="submit" className="w-full h-11 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Access Registration
            </button>
          </form>
        </section>
      </main>
    );
  }

  // Success Screen
  if (registrationResult) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100">
        <section className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-6 border border-purple-100 mx-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              Registration Successful!
            </h2>
          </div>

          <div className="space-y-4 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-sm text-gray-600">Name</span>
              <span className="font-semibold">
                {registrationResult.firstName} {registrationResult.lastName}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-sm text-gray-600">City</span>
              <span className="font-semibold">{registrationResult.city}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-sm text-gray-600">ID</span>
              <span className="font-semibold font-mono">
                {registrationResult.identificationNumber}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-sm text-gray-600">Payment Status</span>
              <span className={`font-semibold px-2 py-0.5 rounded text-sm ${
                registrationResult.paymentStatus === "DONE"
                  ? "bg-green-100 text-green-700"
                  : registrationResult.paymentStatus === "OFFLINE"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {registrationResult.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <span className="text-sm text-gray-600">T-Shirt</span>
              <span className={`font-semibold px-2 py-0.5 rounded text-sm ${
                registrationResult.receivedTshirt
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {registrationResult.receivedTshirt ? "Given" : "Not Given"}
              </span>
            </div>
            {registrationResult.bibNumber && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-600">BIB Number</span>
                <span className="font-bold text-xl text-purple-600">
                  {registrationResult.bibNumber}
                </span>
              </div>
            )}
            {!registrationResult.bibNumber &&
              registrationResult.paymentStatus !== "DONE" && (
                <p className="text-xs text-yellow-600 mt-2">
                  BIB will be generated when payment is marked as DONE
                </p>
              )}
          </div>

          <button onClick={resetForNewRegistration} className="w-full mt-6 h-11 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Register Another Participant
          </button>
        </section>
      </main>
    );
  }

  // Registration Form
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 py-4">
      <section className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-5 md:p-6 border border-purple-100 mx-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
            Quick Registration
          </h2>
          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full"></div>
          <p className="text-xs text-gray-600 mt-2">
            Admin/Volunteer registration form
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5">
              <User className="w-3.5 h-3.5 text-purple-600" />
              Full Name *
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className={`w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                errors.fullName ? "border-red-400" : "border-purple-200"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Last word will be treated as last name
            </p>
          </div>

          {/* Gender */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5">
              Gender *
            </label>
            <select
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value as "MALE" | "FEMALE")}
              className={`w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                errors.gender ? "border-red-400" : "border-purple-200"
              }`}
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5">
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              Mobile Number *
            </label>
            <input
              type="tel"
              placeholder="10 digit mobile number"
              value={form.mobile}
              onChange={(e) =>
                handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className={`w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                errors.mobile ? "border-red-400" : "border-purple-200"
              }`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* Pincode & City */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-purple-600" />
                Pincode *
              </label>
              <input
                type="text"
                placeholder="6 digit pincode"
                value={form.pincode}
                onChange={(e) =>
                  handlePincodeChange(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className={`w-full h-10 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 ${
                  errors.pincode ? "border-red-400" : "border-purple-200"
                }`}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5">
                City *
              </label>
              <input
                type="text"
                placeholder={isPincodeLoading ? "Loading..." : "City"}
                value={form.city}
                readOnly
                className={`w-full h-10 px-3 border rounded-lg bg-gray-50 ${
                  errors.city ? "border-red-400" : "border-purple-200"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
          </div>

          {/* State */}
          {form.state && (
            <div>
              <label className="text-xs font-semibold mb-1.5 block">State</label>
              <input
                type="text"
                value={form.state}
                readOnly
                className="w-full h-10 px-3 border border-purple-200 rounded-lg bg-gray-50"
              />
            </div>
          )}

          {/* T-Shirt Size */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold mb-1.5">
              <Shirt className="w-3.5 h-3.5 text-purple-600" />
              T-Shirt Size (Optional)
            </label>
            <select
              value={form.tShirtSize}
              onChange={(e) => handleChange("tShirtSize", e.target.value)}
              className="w-full h-10 px-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option value="">Select size (if needed)</option>
              {T_SHIRT_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Leave empty if T-shirt not required
            </p>
          </div>

          {/* Error message */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Payment Status Buttons */}
          <div className="pt-4 border-t border-purple-100">
            <p className="text-xs font-semibold mb-3 text-center text-gray-600">
              Select Payment Status & Register
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSubmit("DONE", false)}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {!isLoading && <CheckCircle2 className="w-4 h-4" />}
                अभी Payment दिया (Cash Received)
              </button>
              
              <button
                type="button"
                onClick={() => handleSubmit("DONE", true)}
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {!isLoading && <XCircle className="w-4 h-4" />}
                Registration complete No tshirt 
              
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSubmit("OFFLINE", false)}
                  disabled={isLoading}
                  className="h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {!isLoading && <Clock className="w-4 h-4" />}
                  Marathon Counter
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit("PENDING", false)}
                  disabled={isLoading}
                  className="h-12 border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50 rounded-lg font-medium disabled:opacity-50"
                >
                  Pay Later
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Cash generates BIB immediately. Orange button for paid without T-shirt. Counter/Pending registers without BIB.
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SimpleRegistration;