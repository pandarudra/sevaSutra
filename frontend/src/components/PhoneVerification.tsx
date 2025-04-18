import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

interface PhoneVerificationProps {
  onVerificationComplete: (phoneNumber: string, verified: boolean) => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  onVerificationComplete,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = () => {
    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[0-9]{10,12}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ""))) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to send OTP
    // For this demo, we'll just simulate sending an OTP
    setIsVerifying(true);
    
    setTimeout(() => {
      setOtpSent(true);
      setIsVerifying(false);
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your phone number. (For demo purposes, any 6-digit code will work)",
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    // Validate OTP format
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would verify the OTP with an API
    // For this demo, we'll just simulate verification
    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      toast({
        title: "Phone Verified",
        description: "Your phone number has been successfully verified.",
      });
      onVerificationComplete(phoneNumber, true);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <div className="flex space-x-2">
          <Input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+91 9876543210"
            disabled={otpSent}
          />
          {!otpSent && (
            <Button 
              onClick={handleSendOtp} 
              disabled={isVerifying}
              className="whitespace-nowrap"
            >
              {isVerifying ? "Sending..." : "Send OTP"}
            </Button>
          )}
        </div>
      </div>

      {otpSent && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Enter OTP</label>
          <div className="flex space-x-2">
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              maxLength={6}
            />
            <Button 
              onClick={handleVerifyOtp} 
              disabled={isVerifying}
              className="whitespace-nowrap"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Didn't receive the OTP?{" "}
            <button
              className="text-emergency-600 hover:underline"
              onClick={() => {
                toast({
                  title: "OTP Resent",
                  description: "A new OTP has been sent to your phone number.",
                });
              }}
            >
              Resend
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneVerification;