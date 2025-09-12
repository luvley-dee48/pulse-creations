
import React, { useState, useEffect, useCallback } from "react";
import { Token } from "@/entities/Token";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Users,
  Activity,
  Grid,
  List
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import TokenGrid from "../components/market/TokenGrid";
import MarketFilters from "../components/market/MarketFilters";

export default function Market() {
  const [tokens, setTokens] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("volume_24h");
  const [viewMode, setViewMode] = useState("grid");

  const loadTokens = useCallback(async () => {
    try {
      const data = await Token.list("-" + sortBy, 50);
      setTokens(data);
    } catch (error) {
      console.error("Error loading tokens:", error);
    }
    setIsLoading(false);
  }, [sortBy]);

  const filterTokens = useCallback(() => {
    let filtered = [...tokens];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(token => 
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.creator_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(token => token.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "volume_24h") return (b.volume_24h || 0) - (a.volume_24h || 0);
      if (sortBy === "market_cap") return (b.market_cap || 0) - (a.market_cap || 0);
      if (sortBy === "price_change_24h") return (b.price_change_24h || 0) - (a.price_change_24h || 0);
      if (sortBy === "holders_count") return (b.holders_count || 0) - (a.holders_count || 0);
      return 0;
    });

    setFilteredTokens(filtered);
  }, [tokens, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    loadTokens();
  }, [loadTokens]);

  useEffect(() => {
    filterTokens();
  }, [filterTokens]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Creator Token Market</h1>
          <p className="text-gray-400">Discover and trade creator tokens on the Internet Computer</p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gray-900/50 backdrop-blur border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tokens, creators, or symbols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="volume_24h">24h Volume</SelectItem>
                  <SelectItem value="market_cap">Market Cap</SelectItem>
                  <SelectItem value="price_change_24h">Price Change</SelectItem>
                  <SelectItem value="holders_count">Holders</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-700"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-700"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400">
            {filteredTokens.length} tokens found
          </p>
        </div>

        {/* Token Grid/List */}
        <TokenGrid 
          tokens={filteredTokens} 
          isLoading={isLoading} 
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}
