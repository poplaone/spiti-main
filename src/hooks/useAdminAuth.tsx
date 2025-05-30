
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from '@supabase/supabase-js';
import { toast } from "sonner";

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setupAuth = async () => {
      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            checkAdminStatus(currentSession.user.id, currentSession.user.email);
          } else {
            setIsAdmin(false);
          }
        }
      );

      // Check for existing session
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        checkAdminStatus(currentSession.user.id, currentSession.user.email);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }

      return () => subscription.unsubscribe();
    };
    
    setupAuth();
  }, []);

  const checkAdminStatus = async (userId: string, email?: string | undefined) => {
    try {
      // Special case for the designated admin email
      if (email && email.toLowerCase() === 'spitivalleytravels@gmail.com') {
        // Check if this user is already an admin
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', userId)
          .single();
        
        // If not an admin, add them as admin
        if (error && !data) {
          const { error: insertError } = await supabase
            .from('admin_users')
            .insert({ id: userId });
          
          if (!insertError) {
            setIsAdmin(true);
            return;
          }
        } else if (data) {
          setIsAdmin(true);
          return;
        }
      }
      
      // For all other cases, check admin status normally
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      navigate('/admin-login');
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
    }
  };

  return { user, session, isAdmin, loading, signOut };
};

export default useAdminAuth;
