-- SpeakFlow AI Supabase PostgreSQL schema
-- Run in the Supabase SQL editor after creating a project.

create extension if not exists "pgcrypto";

create type public.learning_level as enum ('beginner', 'active_learner', 'consistent_speaker', 'fluent_performer', 'elite_speaker');
create type public.task_type as enum ('speaking', 'listening', 'vocabulary', 'pronunciation', 'conversation', 'quiz');
create type public.subscription_plan as enum ('free', 'pro', 'premium_ai_coach');
create type public.notification_channel as enum ('in_app', 'push', 'email');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  phone text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  current_level text not null default 'beginner',
  pronunciation_confidence int not null default 0 check (pronunciation_confidence between 0 and 100),
  speaking_confidence int not null default 0 check (speaking_confidence between 0 and 100),
  daily_speaking_target_minutes int not null default 15,
  daily_vocabulary_target int not null default 10,
  daily_listening_target_minutes int not null default 8,
  daily_pronunciation_target_minutes int not null default 5,
  target_purpose text not null default 'jobs',
  tamil_support_enabled boolean not null default true,
  english_thinking_mode boolean not null default true,
  consistency_rank public.learning_level not null default 'beginner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  day_number int not null check (day_number between 1 and 90),
  module text not null,
  title text not null,
  description text not null,
  phase text not null,
  speaking_prompt text not null,
  listening_prompt text not null,
  vocabulary_prompt text not null,
  pronunciation_drill text not null,
  mini_quiz jsonb not null default '[]'::jsonb,
  required_voice_submission boolean not null default true,
  locked_until_previous_complete boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.daily_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  task_date date not null,
  task_type public.task_type not null,
  title text not null,
  prompt text not null,
  xp int not null default 0,
  required boolean not null default false,
  completed_at timestamptz,
  voice_submission_url text,
  unique (user_id, task_date, task_type, title)
);

create table public.speaking_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  daily_task_id uuid references public.daily_tasks(id) on delete set null,
  transcript text not null,
  duration_seconds int not null,
  words_per_minute int not null,
  pronunciation_score int not null check (pronunciation_score between 0 and 100),
  fluency_score int not null check (fluency_score between 0 and 100),
  grammar_score int not null check (grammar_score between 0 and 100),
  confidence_score int not null check (confidence_score between 0 and 100),
  hesitation_score int not null check (hesitation_score between 0 and 100),
  filler_word_count int not null default 0,
  created_at timestamptz not null default now()
);

create table public.pronunciation_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  speaking_score_id uuid references public.speaking_scores(id) on delete cascade,
  issue_key text not null,
  issue_label text not null,
  accuracy int not null check (accuracy between 0 and 100),
  native_audio_url text,
  learner_audio_url text,
  correction text not null,
  mouth_position_tip text,
  created_at timestamptz not null default now()
);

create table public.streaks (
  user_id uuid primary key references public.users(id) on delete cascade,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  freeze_days_available int not null default 1,
  freeze_days_used int not null default 0,
  last_completed_date date,
  missed_days_this_week int not null default 0,
  recovery_challenge_due_at timestamptz,
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  key text not null,
  title text not null,
  description text not null,
  xp_awarded int not null default 0,
  unlocked_at timestamptz not null default now(),
  unique (user_id, key)
);

create table public.vocabulary_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  word text not null,
  tamil_meaning text,
  example_sentence text not null,
  pronunciation_audio_url text,
  ease_factor numeric(4, 2) not null default 2.50,
  review_count int not null default 0,
  next_review_at timestamptz not null default now(),
  mastered boolean not null default false,
  unique (user_id, word)
);

create table public.subscriptions (
  user_id uuid primary key references public.users(id) on delete cascade,
  plan public.subscription_plan not null default 'free',
  status text not null default 'active',
  provider_customer_id text,
  provider_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create table public.ai_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  daily_task_id uuid references public.daily_tasks(id) on delete set null,
  feedback_type text not null,
  model text not null,
  prompt_tokens int not null default 0,
  completion_tokens int not null default 0,
  feedback jsonb not null,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  channel public.notification_channel not null,
  title text not null,
  body text not null,
  scheduled_for timestamptz not null,
  sent_at timestamptz,
  read_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.study_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references public.users(id) on delete set null,
  public_streaks boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.study_group_members (
  group_id uuid not null references public.study_groups(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  accountability_partner_id uuid references public.users(id) on delete set null,
  joined_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.daily_tasks enable row level security;
alter table public.speaking_scores enable row level security;
alter table public.pronunciation_reports enable row level security;
alter table public.streaks enable row level security;
alter table public.achievements enable row level security;
alter table public.vocabulary_progress enable row level security;
alter table public.subscriptions enable row level security;
alter table public.ai_feedback enable row level security;
alter table public.notifications enable row level security;
alter table public.study_groups enable row level security;
alter table public.study_group_members enable row level security;

create policy "Users can read own user row" on public.users for select using (auth.uid() = id);
create policy "Users can update own user row" on public.users for update using (auth.uid() = id);
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = user_id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = user_id);
create policy "Authenticated users can read lessons" on public.lessons for select to authenticated using (true);
create policy "Users can manage own daily tasks" on public.daily_tasks for all using (auth.uid() = user_id);
create policy "Users can read own speaking scores" on public.speaking_scores for select using (auth.uid() = user_id);
create policy "Users can insert own speaking scores" on public.speaking_scores for insert with check (auth.uid() = user_id);
create policy "Users can read own pronunciation reports" on public.pronunciation_reports for select using (auth.uid() = user_id);
create policy "Users can read own streak" on public.streaks for select using (auth.uid() = user_id);
create policy "Users can read own achievements" on public.achievements for select using (auth.uid() = user_id);
create policy "Users can manage own vocabulary" on public.vocabulary_progress for all using (auth.uid() = user_id);
create policy "Users can read own subscription" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Users can read own AI feedback" on public.ai_feedback for select using (auth.uid() = user_id);
create policy "Users can manage own notifications" on public.notifications for all using (auth.uid() = user_id);
create policy "Authenticated users can read public groups" on public.study_groups for select to authenticated using (true);
create policy "Users can read own group memberships" on public.study_group_members for select using (auth.uid() = user_id);

create index daily_tasks_user_date_idx on public.daily_tasks (user_id, task_date);
create index speaking_scores_user_created_idx on public.speaking_scores (user_id, created_at desc);
create index pronunciation_reports_user_issue_idx on public.pronunciation_reports (user_id, issue_key);
create index notifications_user_schedule_idx on public.notifications (user_id, scheduled_for);
create index vocabulary_progress_review_idx on public.vocabulary_progress (user_id, next_review_at);
