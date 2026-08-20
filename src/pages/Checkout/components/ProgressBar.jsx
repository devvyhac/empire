import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ShieldCheck, Check } from "lucide-react";

const STEPS = [
  { id: 1, name: "Cart", path: "/cart", icon: ShoppingBag },
  { id: 2, name: "Checkout", path: "/checkout", icon: ShieldCheck },
  { id: 3, name: "Confirmation", path: "/confirm-order", icon: Check },
];

const ProgressBar = ({ activeStep = 2 }) => {
  return (
    <div className="bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 rounded-2xl p-3.5 sm:p-5 shadow-sm mb-6 sm:mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {STEPS.map((step, index) => {
          const isCurrent = step.id === activeStep;
          const isPassed = step.id < activeStep;
          const StepIcon = step.icon;

          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {isPassed ? (
                  <Link
                    to={step.path}
                    className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-poppins font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition-all duration-150"
                    title={`Back to ${step.name}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                ) : (
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-poppins font-bold text-xs sm:text-sm transition-all duration-200 ${
                      isCurrent
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105 ring-4 ring-indigo-50 dark:ring-indigo-950/60"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    <span>{step.id}</span>
                  </div>
                )}

                <div className="hidden sm:block">
                  <p
                    className={`text-xs sm:text-sm font-semibold ${
                      isCurrent
                        ? "text-indigo-600 dark:text-indigo-400"
                        : isPassed
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 mx-2 sm:mx-4 h-0.5 rounded-full transition-colors duration-300 ${
                    isPassed
                      ? "bg-emerald-500/70"
                      : "bg-gray-200 dark:bg-gray-700/80"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
