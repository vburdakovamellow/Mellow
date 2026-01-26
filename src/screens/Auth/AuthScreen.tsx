import { useState } from "react";
import { Button } from "../../design-system/primitives/Button/Button";
import { Input } from "../../design-system/primitives/Input/Input";
import "../../design-system/typography.css";
import styles from "./AuthScreen.module.css";

export function AuthScreen({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      // Simple validation
      onComplete();
    }
  };

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>mellow</div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Create Your Account</h1>
          <p className={styles.subtitle}>
            Save your request and start receiving applications from freelancers
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />

            <Button variant="brand" type="submit">
              Continue
            </Button>
          </form>

          <p className={styles.notice}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
