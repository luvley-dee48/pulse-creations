import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Minus } from "lucide-react";

export default function CurveSelector({ value, onChange }) {
  const curves = [
    {
      type: "bonding",
      name: "Bonding Curve",
      description: "Price increases as more tokens are bought",
      icon: TrendingUp,
      recommended: true
    },
    {
      type: "linear",
      name: "Linear",
      description: "Price increases at a steady rate",
      icon: BarChart3,
      recommended: false
    },
    {
      type: "fixed",
      name: "Fixed Price",
      description: "Price remains constant",
      icon: Minus,
      recommended: false
    }
  ];

  return (
    <div>
      <Label className="text-white mb-3 block">Price Curve</Label>
      <div className="grid gap-3">
        {curves.map((curve) => (
          <Card
            key={curve.type}
            className={`cursor-pointer transition-all duration-200 ${
              value === curve.type
                ? 'bg-blue-500/20 border-blue-500/50'
                : 'bg-gray-800/30 border-gray-700 hover:bg-gray-800/50'
            }`}
            onClick={() => onChange(curve.type)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <curve.icon className={`w-5 h-5 ${
                  value === curve.type ? 'text-blue-400' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold ${
                      value === curve.type ? 'text-blue-400' : 'text-white'
                    }`}>
                      {curve.name}
                    </h4>
                    {curve.recommended && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{curve.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}