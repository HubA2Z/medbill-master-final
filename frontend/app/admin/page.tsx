import AdminGate from '@/components/admin/AdminGate';
import PostList from '@/components/admin/PostList';

export default function Page() {
  return (
    <AdminGate>
      <PostList />
    </AdminGate>
  );
}
