export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          user_type: 'student' | 'institution' | 'employer'
          wallet_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          user_type: 'student' | 'institution' | 'employer'
          wallet_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          user_type?: 'student' | 'institution' | 'employer'
          wallet_address?: string | null
          created_at?: string
        }
      }
      credentials: {
        Row: {
          id: string
          issuer_id: string
          recipient_id: string
          title: string
          description: string | null
          issue_date: string
          blockchain_tx_hash: string | null
          created_at: string
        }
        Insert: {
          id?: string
          issuer_id: string
          recipient_id: string
          title: string
          description?: string | null
          issue_date?: string
          blockchain_tx_hash?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          issuer_id?: string
          recipient_id?: string
          title?: string
          description?: string | null
          issue_date?: string
          blockchain_tx_hash?: string | null
          created_at?: string
        }
      }
      verifications: {
        Row: {
          id: string
          credential_id: string
          verifier_id: string
          status: 'pending' | 'verified' | 'rejected'
          verified_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          credential_id: string
          verifier_id: string
          status: 'pending' | 'verified' | 'rejected'
          verified_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          credential_id?: string
          verifier_id?: string
          status?: 'pending' | 'verified' | 'rejected'
          verified_at?: string | null
          created_at?: string
        }
      }
    }
  }
}