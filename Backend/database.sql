
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 120),
    reporter_email TEXT NOT NULL CHECK (char_length(reporter_email) BETWEEN 1 AND 120),
    category TEXT NOT NULL CHECK (
        category IN (
            'child-safety',
            'trafficking',
            'child-labour',
            'missing-child',
            'other'
        )
    ),
    description TEXT NOT NULL CHECK (
        char_length(description) BETWEEN 1 AND 5000
    ),
    location TEXT,
    status TEXT NOT NULL DEFAULT 'received'
        CHECK (status IN (
            'received',
            'under_review',
            'resolved',
            'closed'
        )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own reports"
ON public.reports
FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can submit own reports"
ON public.reports
FOR INSERT TO authenticated
WITH CHECK (
    (SELECT auth.uid()) = user_id
    AND status = 'received'
);

GRANT SELECT, INSERT ON public.reports TO authenticated;