import type { RowViewProps } from "@/types/components";

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

export default function RowView({ patients }: RowViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition hover:border-slate-400"
        >
          <span>PDF</span>
          <span aria-hidden="true">↓</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold text-blue-500">
                <th className="px-4 py-4">ID</th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Age</th>
                <th className="px-4 py-4">Medical Issue</th>
                <th className="px-4 py-4">Address</th>
                <th className="px-4 py-4">Phone Number</th>
                <th className="px-4 py-4">Email ID</th>
                <th className="px-4 py-4" />
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => {
                const contact = patient.contact[0];
                const issueTone =
                  toneMap[patient.medical_issue] ??
                  "bg-slate-100 text-slate-700";
                const avatarTone =
                  avatarColors[patient.patient_id % avatarColors.length];

                return (
                  <tr
                    key={patient.patient_id}
                    className="border-b border-slate-200 text-slate-600 last:border-b-0"
                  >
                    <td className="px-4 py-4 font-semibold text-slate-500">
                      ID-{String(patient.patient_id).padStart(4, "0")}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${avatarTone}`}
                        >
                          {getInitials(patient.patient_name)}
                        </div>
                        <span className="font-medium text-slate-800">
                          {patient.patient_name}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 font-medium text-slate-700">
                      {patient.age}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold capitalize ${issueTone}`}
                      >
                        {patient.medical_issue}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {contact?.address ? (
                        contact.address
                      ) : (
                        <span className="font-medium text-red-500">N/A</span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {contact?.number ? (
                        contact.number
                      ) : (
                        <span className="font-medium text-red-500">N/A</span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {contact?.email ? (
                        contact.email
                      ) : (
                        <span className="font-medium text-red-500">N/A</span>
                      )}
                    </td>

                    <td className="px-4 py-4 text-right text-lg font-semibold text-slate-500">
                      ›
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
