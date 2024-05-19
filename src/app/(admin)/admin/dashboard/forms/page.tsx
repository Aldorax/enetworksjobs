import { Separator } from "@/registry/new-york/ui/separator";
import { ProfileForm } from "./profile-form";
import { MainNav } from "../components/main-nav";
import { UserNav } from "../components/user-nav";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className=" text-card-foreground bg-card-foreground" />
      <ProfileForm />
    </div>
  );
}
