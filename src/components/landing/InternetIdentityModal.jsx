import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Globe, CheckCircle, ArrowRight } from "lucide-react";

export default function InternetIdentityModal({ isOpen, onClose, onAuthenticate, isLoading }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
            <div className="relative overflow-hidden rounded-2xl">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
              
              {/* Content */}
              <div className="relative p-8">
                <DialogHeader className="text-center mb-8">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>

                  <DialogTitle className="text-2xl font-bold text-slate-800 mb-2">
                    Verify your{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      identity
                    </span>
                  </DialogTitle>
                  <p className="text-slate-600">
                    Secure, passwordless authentication powered by Internet Computer
                  </p>
                </DialogHeader>

                {/* Steps Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-4 gap-2 mb-8"
                >
                  {[
                    { step: 1, title: "Verify Identity", active: true },
                    { step: 2, title: "Business Profile", active: false },
                    { step: 3, title: "Features", active: false },
                    { step: 4, title: "Terms", active: false }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 mx-auto ${
                        item.active 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-200 text-slate-500'
                      }`}>
                        {item.active ? <CheckCircle className="w-4 h-4" /> : item.step}
                      </div>
                      <div className="text-xs text-slate-600">{item.title}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Authentication Buttons */}
                <div className="space-y-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      onClick={onAuthenticate}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Authenticating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5" />
                          Sign Up with Internet Identity
                        </div>
                      )}
                    </Button>
                  </motion.div>

                  <div className="text-center text-slate-400 text-sm">OR</div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded" />
                        Sign Up with NFID
                      </div>
                    </Button>
                  </motion.div>
                </div>

                {/* Security Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200"
                >
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      No passwords required
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Decentralized identity
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Maximum security & privacy
                    </div>
                  </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-xs text-slate-500 mt-6"
                >
                  Don't have an Internet Identity? 
                  <button className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                    Create one now
                  </button>
                </motion.p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}