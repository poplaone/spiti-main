-- ================================================
-- 1. CREATE USER ROLES SYSTEM
-- ================================================

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- ================================================
-- 2. ENABLE RLS ON ALL EXISTING TABLES
-- ================================================

ALTER TABLE public.tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.night_stays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_departure_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ================================================
-- 3. CREATE RLS POLICIES FOR TOUR DATA
-- (Public read, admin-only write)
-- ================================================

-- Tour Packages Policies
CREATE POLICY "Anyone can view tour packages"
  ON public.tour_packages FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert tour packages"
  ON public.tour_packages FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update tour packages"
  ON public.tour_packages FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete tour packages"
  ON public.tour_packages FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Itinerary Days Policies
CREATE POLICY "Anyone can view itinerary days"
  ON public.itinerary_days FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert itinerary days"
  ON public.itinerary_days FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update itinerary days"
  ON public.itinerary_days FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete itinerary days"
  ON public.itinerary_days FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Inclusions Policies
CREATE POLICY "Anyone can view inclusions"
  ON public.inclusions FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert inclusions"
  ON public.inclusions FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update inclusions"
  ON public.inclusions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete inclusions"
  ON public.inclusions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Exclusions Policies
CREATE POLICY "Anyone can view exclusions"
  ON public.exclusions FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert exclusions"
  ON public.exclusions FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update exclusions"
  ON public.exclusions FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete exclusions"
  ON public.exclusions FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Night Stays Policies
CREATE POLICY "Anyone can view night stays"
  ON public.night_stays FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert night stays"
  ON public.night_stays FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update night stays"
  ON public.night_stays FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete night stays"
  ON public.night_stays FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tour Departure Dates Policies
CREATE POLICY "Anyone can view departure dates"
  ON public.tour_departure_dates FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert departure dates"
  ON public.tour_departure_dates FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update departure dates"
  ON public.tour_departure_dates FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete departure dates"
  ON public.tour_departure_dates FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ================================================
-- 4. CREATE RLS POLICIES FOR ADMIN USERS
-- (Admin-only access)
-- ================================================

CREATE POLICY "Only admins can view admin users"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert admin users"
  ON public.admin_users FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update admin users"
  ON public.admin_users FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete admin users"
  ON public.admin_users FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ================================================
-- 5. CREATE RLS POLICIES FOR USER ROLES
-- (Users can view own roles, only admins can modify)
-- ================================================

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert user roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update user roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete user roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));