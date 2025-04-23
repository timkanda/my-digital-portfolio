"use client";

import { useState } from "react";
import { AlertTriangle, FileCode, Lock, Server, Shield, Users, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Map of available icons for projects
const availableIcons = {
  AlertTriangle: "Alert Triangle",
  Shield: "Shield",
  FileCode: "File Code",
  Lock: "Lock",
  Server: "Server",
  Users: "Users"
};

export default function AddProjectForm({ onProjectAdded }: { onProjectAdded: () => void }) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const addItem = () => {
    if (newItem.trim() !== "") {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim() || !description.trim() || !selectedIcon || items.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields and add at least one item.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // Include credentials (cookies) in the request
        body: JSON.stringify({
          title,
          description,
          icon: selectedIcon,
          items
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }
      
      // Reset form
      setTitle("");
      setDescription("");
      setSelectedIcon("");
      setItems([]);
      setIsFormVisible(false);
      
      // Show success message
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      
      // Notify parent component to refresh projects
      onProjectAdded();
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create project",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="mb-10">
      <Button variant={isFormVisible ? "secondary" : "default"} onClick={toggleForm} className="mb-4">
        {isFormVisible ? "Cancel" : "Add New Project"}
      </Button>
      
      {isFormVisible && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>Create a new project to showcase your services</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input 
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Penetration Testing"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea 
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the project"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="icon" className="text-sm font-medium">Icon</label>
                <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(availableIcons).map(([value, label]) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="items" className="text-sm font-medium">Items</label>
                <div className="flex space-x-2">
                  <Input 
                    id="newItem"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="e.g., Web Application Testing"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem())}
                  />
                  <Button type="button" onClick={addItem} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {items.length > 0 && (
                  <div className="mt-2">
                    <label className="text-sm font-medium">Added Items:</label>
                    <ul className="mt-1 space-y-1">
                      {items.map((item, index) => (
                        <li key={index} className="flex items-center justify-between bg-primary/10 p-2 rounded-md">
                          <span>{item}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeItem(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Project"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}