import { cn } from "@/lib/utils";
import React from "react";

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className="flex items-center w-full mb-10">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, index) => (
          <React.Fragment key={step}>
            <div
              className={cn(
                "p-2 rounded-full text-center text-gray-500 text-sm whitespace-nowrap px-4",
                index === current ? "bg-secondary text-gray-950" : "",
              )}
            >
              {step}
            </div>
            {step !== "Place Order" && (
              <hr className="flex-1 border-t border-gray-300 mx-2" />
            )}
          </React.Fragment>
        ),
      )}
    </div>
  );
};

export default CheckoutSteps;
