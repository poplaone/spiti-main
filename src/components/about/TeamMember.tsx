
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  imageSrc: string;
  description: string[];
  fallback: string;
}

const TeamMember = ({ name, role, imageSrc, description, fallback }: TeamMemberProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-0">
      <CardContent className="p-6">
        <div className="mb-4 flex justify-center">
          <Avatar className="h-32 w-32 border-2 border-spiti-green">
            <AvatarImage alt={name} src={imageSrc} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-xl font-bold text-white mb-1 text-center">{name}</h3>
        <p className="text-spiti-green mb-3 text-center">{role}</p>
        {description.map((paragraph, idx) => (
          <p key={idx} className={`text-white/80 text-sm ${idx > 0 ? 'mt-2' : ''}`}>
            {paragraph}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default TeamMember;
