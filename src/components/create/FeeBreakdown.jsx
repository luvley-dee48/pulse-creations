import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function FeeBreakdown({ creationFee, tokenData }) {
  return (
    <Card className="bg-gray-900/50 backdrop-blur border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          Fee Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Creation Fee */}
        <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
          <div>
            <div className="text-white font-medium">Creation Fee</div>
            <div className="text-gray-400 text-sm">One-time minting cost</div>
          </div>
          <div className="text-white font-bold">{creationFee} ICP</div>
        </div>

        {/* Trading Fees */}
        <div className="space-y-2">
          <h4 className="text-white font-medium">Trading Fees (per transaction)</h4>
          
          <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
            <div>
              <div className="text-white">Platform Fee</div>
              <div className="text-gray-400 text-sm">Pulse protocol fee</div>
            </div>
            <div className="text-white">{tokenData.platform_fee}%</div>
          </div>

          <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
            <div>
              <div className="text-white">Creator Royalty</div>
              <div className="text-gray-400 text-sm">Your earnings per trade</div>
            </div>
            <div className="text-green-400 font-medium">{tokenData.royalty_percentage}%</div>
          </div>
        </div>

        {/* Example */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-medium mb-2">Example Trade</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Trade Value: 1 ICP</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Platform Fee:</span>
              <span>{(tokenData.platform_fee / 100).toFixed(3)} ICP</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>Your Royalty:</span>
              <span>{(tokenData.royalty_percentage / 100).toFixed(3)} ICP</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}