import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity,
  ExternalLink
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TokenGrid({ tokens, isLoading, viewMode }) {
  const categoryColors = {
    gaming: "bg-red-500/20 text-red-400 border-red-500/30",
    art: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    music: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    sports: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    lifestyle: "bg-green-500/20 text-green-400 border-green-500/30",
    tech: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    other: "bg-gray-500/20 text-gray-400 border-gray-500/30"
  };

  if (isLoading) {
    return (
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {Array(9).fill(0).map((_, i) => (
          <Card key={i} className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="w-16 h-16 rounded-full bg-gray-800" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2 bg-gray-800" />
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-gray-800" />
                <Skeleton className="h-4 w-3/4 bg-gray-800" />
                <Skeleton className="h-10 w-full bg-gray-800" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {tokens.map((token) => (
          <Card key={token.id} className="bg-gray-900/50 backdrop-blur border-gray-800 hover:bg-gray-800/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">
                    {token.symbol?.charAt(0) || 'T'}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate">{token.name}</h3>
                    <Badge className={categoryColors[token.category] || categoryColors.other}>
                      {token.category}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">by {token.creator_name}</p>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-white font-semibold">{token.current_price?.toFixed(4) || '0'} ICP</div>
                    <div className={`flex items-center gap-1 ${
                      (token.price_change_24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {(token.price_change_24h || 0) >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {Math.abs(token.price_change_24h || 0).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="text-center text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {token.holders_count || 0}
                    </div>
                  </div>
                  
                  <div className="text-center text-gray-400">
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {token.volume_24h?.toFixed(1) || '0'} ICP
                    </div>
                  </div>
                </div>
                
                <Link to={createPageUrl(`Token?id=${token.id}`)}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Trade
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tokens.map((token) => (
        <Card key={token.id} className="bg-gray-900/50 backdrop-blur border-gray-800 hover:bg-gray-800/50 transition-all duration-200 hover:scale-105">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {token.symbol?.charAt(0) || 'T'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-lg truncate">{token.name}</h3>
                <p className="text-gray-400 text-sm">by {token.creator_name}</p>
                <Badge className={categoryColors[token.category] || categoryColors.other}>
                  {token.category}
                </Badge>
              </div>
            </div>

            {/* Price Info */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-white">
                  {token.current_price?.toFixed(4) || '0'} ICP
                </span>
                <div className={`flex items-center gap-1 ${
                  (token.price_change_24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {(token.price_change_24h || 0) >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(token.price_change_24h || 0).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                  <Users className="w-3 h-3" />
                  Holders
                </div>
                <div className="text-white font-semibold">{token.holders_count || 0}</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                  <Activity className="w-3 h-3" />
                  24h Volume
                </div>
                <div className="text-white font-semibold">{token.volume_24h?.toFixed(1) || '0'} ICP</div>
              </div>
            </div>

            {/* Action Button */}
            <Link to={createPageUrl(`Token?id=${token.id}`)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                View & Trade
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}