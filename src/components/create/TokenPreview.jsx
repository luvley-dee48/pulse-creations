import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, Users, Activity } from "lucide-react";

export default function TokenPreview({ tokenData }) {
  const categoryColors = {
    gaming: "bg-red-500/20 text-red-400 border-red-500/30",
    art: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    music: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    sports: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    lifestyle: "bg-green-500/20 text-green-400 border-green-500/30",
    tech: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    other: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  };

  const marketCap = tokenData.total_supply * tokenData.current_price;

  return (
    <Card className="bg-gray-900/50 backdrop-blur border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-400" />
          Token Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Token Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {tokenData.symbol?.charAt(0) || 'T'}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">
                {tokenData.name || 'Token Name'}
              </h3>
              <p className="text-gray-400 text-sm">
                ${tokenData.symbol || 'SYMBOL'}
              </p>
              {tokenData.category && (
                <Badge className={categoryColors[tokenData.category] || categoryColors.other}>
                  {tokenData.category}
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {tokenData.description && (
            <div>
              <p className="text-gray-300 text-sm">
                {tokenData.description}
              </p>
            </div>
          )}

          {/* Price */}
          <div className="text-center py-4 bg-gray-800/30 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {tokenData.current_price?.toFixed(4) || '0.0000'} ICP
            </div>
            <div className="text-gray-400 text-sm">Initial Price</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/30 rounded-lg p-3 text-center">
              <div className="text-white font-semibold">
                {tokenData.total_supply?.toLocaleString() || '0'}
              </div>
              <div className="text-gray-400 text-sm">Total Supply</div>
            </div>
            <div className="bg-gray-800/30 rounded-lg p-3 text-center">
              <div className="text-white font-semibold">
                {marketCap.toFixed(2)} ICP
              </div>
              <div className="text-gray-400 text-sm">Market Cap</div>
            </div>
          </div>

          {/* Curve Type */}
          {tokenData.curve_type && (
            <div className="bg-gray-800/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Price Curve</span>
                <span className="text-white font-semibold capitalize">
                  {tokenData.curve_type}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}