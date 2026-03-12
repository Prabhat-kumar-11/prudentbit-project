import type { CardViewProps } from "@/types/components";

const toneMap: Record<string, string> = {
  fever: "bg-red-100 text-red-700",
  headache: "bg-orange-100 text-orange-700",
  rash: "bg-pink-100 text-pink-700",
  sinusitis: "bg-slate-200 text-slate-700",
  "sore throat": "bg-yellow-100 text-yellow-800",
  "sprained ankle": "bg-emerald-100 text-emerald-700",
  "ear infection": "bg-cyan-100 text-cyan-700",
  "allergic reaction": "bg-violet-100 text-violet-700",
  "stomach ache": "bg-indigo-100 text-indigo-700",
  "broken arm": "bg-amber-100 text-amber-800",
};

const avatarColors = [
  "bg-rose-100 text-rose-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function CardView({ patients }: CardViewProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {patients.map((patient) => {
        const contact = patient.contact[0];
        const issueTone =
          toneMap[patient.medical_issue] ?? "bg-slate-100 text-slate-700";
        const avatarTone =
          avatarColors[patient.patient_id % avatarColors.length];

        return (
          <article
            key={patient.patient_id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-start justify-between gap-3 bg-sky-100 px-4 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${avatarTone}`}
                >
                  {getInitials(patient.patient_name)}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {patient.patient_name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    ID-{String(patient.patient_id).padStart(4, "0")}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                Age: {patient.age}
              </span>
            </div>

            <div className="space-y-3 px-4 py-4 text-sm text-slate-600">
              <span
                className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold capitalize ${issueTone}`}
              >
                {patient.medical_issue}
              </span>

              <p>📍 {contact?.address ?? "N/A"}</p>
              <p>☎ {contact?.number ?? "N/A"}</p>
              <p>✉ {contact?.email ?? "N/A"}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
